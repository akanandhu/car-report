import { Injectable, BadRequestException } from '@nestjs/common';
import { AuthRoleService } from '../auth-role.service';
import { OAuthUserData } from './oauth.service';
import {
  AuthCredentialRepository,
  RoleRepository,
  UserRepository,
} from '@shared/repositories';
import {
  AuthProvider,
  AuthRole,
} from '@shared/common/constants/constants';
import { User } from '@shared/repositories/models/user.model';
import { OnboardingStep } from '@shared/repositories/models/userOnboard.model';
import { UserOnboardingService } from '../../user-onboarding/user-onboarding.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRegistrationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authCredentialRepository: AuthCredentialRepository,
    private readonly roleRepository: RoleRepository,
    private readonly authRoleService: AuthRoleService,
    private readonly userOnboardingService: UserOnboardingService,
  ) {}

  /**
   * Register a new user with phone number
   * @param phoneNumber Phone number in international format
   * @param role User role (rider, driver, etc.)
   * @returns Created or existing user
   */
  async registerWithPhone(phoneNumber: string, role: AuthRole): Promise<User> {
    // First check if an auth credential with this phone number already exists
    const existingCredential =
      await this.authCredentialRepository.findByTypeAndIdentifier(
        AuthProvider.PHONE,
        phoneNumber,
      );

    let user: User | null = null;

    if (existingCredential) {
      // Check if the user associated with this credential exists (including soft-deleted)
      const credentialUser = await this.userRepository.findById(
        existingCredential.userId,
        { includeSoftDeleted: true },
      );

      if (credentialUser) {
        if (credentialUser.deletedAt) {
          // If user was soft-deleted, restore it
          console.log(
            `Restoring previously deleted user with ID ${credentialUser.id}`,
          );
          const restoredUser = await this.userRepository.restoreById(
            credentialUser.id,
          );
          user = restoredUser as User;
        } else {
          // User exists and is not deleted, use it
          user = credentialUser as User;
        }
      }
    }

    // If no user was found or restored, create a new one
    if (!user) {
      const newUser = await this.userRepository.create({
        phoneNumber,
        email: null,
        emailVerifiedAt: null,
        phoneVerifiedAt: null,
        otpSecret: null,
        isPolicyAllowed: false,
      });

      user = newUser as User;

      // Use createOrLinkCredential which handles the case where a credential already exists
      await this.authCredentialRepository.createOrLinkCredential(
        AuthProvider.PHONE,
        phoneNumber,
        user.id,
        null, // No metadata needed for phone auth
      );
    }

    await this.authRoleService.assignRoleToUser(user.id, role);
    // Automatically create onboarding step for driver
    if (role === AuthRole.DRIVER) {
      const driverRole = await this.roleRepository.findByName('driver');
      if (!driverRole) {
        throw new BadRequestException(`Role ${role} not found`);
      }
      const userOnboard =
        await this.userOnboardingService.findOnboardByUserIdAndRoleId(
          user.id,
          driverRole.id,
        );

      if (!userOnboard) {
        console.log(
          `Creating onboarding step for user ${user.id} with role ${driverRole.name}`,
        );
        await this.userOnboardingService.updateOrCreateOnboardingStepByUserAndRole(
          user.id,
          driverRole.id,
          OnboardingStep.PHONE_VERIFICATION,
        );
      }
    }
    return user;
  }

  /**
   * Register a new user with email address (riders only)
   * @param email Email address
   * @param role User role (must be RIDER)
   * @returns Created or existing user
   */
  async registerWithEmail(email: string, role: AuthRole): Promise<User> {
    // Check if role is RIDER, if not, throw an error
    if (role !== AuthRole.RIDER) {
      throw new BadRequestException(
        'Email authentication is only available for riders',
      );
    }

    let user = await this.userRepository.findByEmail(email);

    if (!user) {
      user = await this.userRepository.create({
        email,
        emailVerifiedAt: null,
        phoneNumber: null,
        phoneVerifiedAt: null,
        otpSecret: null,
        isPolicyAllowed: false,
      });

      await this.authCredentialRepository.createWithUser(
        user.id,
        AuthProvider.EMAIL,
        email,
      );

      await this.authRoleService.assignRoleToUser(user.id, role);
    }

    return user as User;
  }

  /**
   * Register or find user with OAuth provider
   * @param provider OAuth provider
   * @param userData User data from OAuth provider
   * @param role Role for the user
   * @returns Created or existing user
   */
  async registerWithOAuth(
    provider: AuthProvider,
    userData: OAuthUserData,
    role?: AuthRole,
  ): Promise<User> {
    if (!userData.email) {
      throw new BadRequestException('Email is required for OAuth registration');
    }

    const providerId = userData.sub || userData.id;
    if (!providerId) {
      throw new BadRequestException(
        'Provider user ID is required for OAuth registration',
      );
    }

    console.log(
      `[OAuth] Registering user with ${provider}, email: ${userData.email}, providerId: ${providerId}`,
    );

    // First, try to find user by OAuth provider ID (most reliable)
    let existingCredential =
      await this.authCredentialRepository.findByTypeAndIdentifier(
        provider,
        providerId,
        { include: { user: true } },
      );

    let user = existingCredential?.user;

    if (user) {
      console.log(
        `[OAuth] Found existing user ${user.id} with ${provider} credential`,
      );
      // User exists with OAuth credential - handle potential email changes
      await this.handleOAuthEmailUpdate(
        user,
        existingCredential,
        userData,
        provider,
      );
      return user as User;
    }

    // If no OAuth credential found, check by email as fallback
    if (userData.email) {
      user = await this.userRepository.findByEmail(userData.email);

      if (user) {
        console.log(
          `[OAuth] Found existing user ${user.id} by email, linking ${provider} account`,
        );
        // User exists with email but no OAuth credential - link the OAuth account
        await this.linkOAuthToExistingUser(
          user,
          provider,
          providerId,
          userData,
        );
        return user as User;
      }
    }

    console.log(
      `[OAuth] Creating new user for ${provider} with email: ${userData.email}`,
    );
    // No existing user found - create new user
    return this.createNewOAuthUser(provider, userData, providerId, role);
  }

  /**
   * Handle email updates for existing OAuth users (especially important for Apple masked emails)
   */
  private async handleOAuthEmailUpdate(
    user: any,
    existingCredential: any,
    userData: OAuthUserData,
    provider: AuthProvider,
  ): Promise<void> {
    const currentStoredEmail =
      existingCredential.metadata?.currentEmail || user.email;

    // Check if email has changed
    if (currentStoredEmail !== userData.email) {
      console.log(
        `[OAuth] Email changed for ${provider} user ${user.id}: ${currentStoredEmail} -> ${userData.email}`,
      );

      // For Apple private emails, check if this might be a new masked email
      if (provider === AuthProvider.APPLE && userData.isPrivateEmail) {
        console.log(
          `[OAuth] Apple private email detected for user ${user.id}. Previous: ${currentStoredEmail}, New: ${userData.email}`,
        );
      }

      // Check if the new email is already used by another user
      await this.validateEmailUniqueness(userData.email, user.id);

      // Update user's email
      await this.userRepository.updateUserEmail(user.id, userData.email);

      // Update credential metadata to track email history
      const emailHistory = existingCredential.metadata?.emailHistory || [
        currentStoredEmail,
      ];
      if (!emailHistory.includes(userData.email)) {
        emailHistory.push(userData.email);
      }

      await this.authCredentialRepository.updateMetadata(
        existingCredential.id,
        {
          ...existingCredential.metadata,
          currentEmail: userData.email,
          emailHistory,
          lastEmailUpdate: new Date().toISOString(),
          provider: provider,
          isPrivateEmail: userData.isPrivateEmail || false,
          realUserStatus: userData.realUserStatus || 'unknown',
        },
      );
    }
  }

  /**
   * Validate that email is not already used by another user
   */
  private async validateEmailUniqueness(
    email: string,
    currentUserId: string,
  ): Promise<void> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser && existingUser.id !== currentUserId) {
      console.warn(
        `[OAuth] Email ${email} is already used by user ${existingUser.id}, but trying to assign to user ${currentUserId}`,
      );
      throw new BadRequestException(
        `Email ${email} is already associated with another account`,
      );
    }
  }

  /**
   * Link OAuth account to existing user (found by email)
   */
  private async linkOAuthToExistingUser(
    user: any,
    provider: AuthProvider,
    providerId: string,
    userData: OAuthUserData,
  ): Promise<void> {
    // Check if this OAuth provider is already linked to prevent duplicates
    const existingOAuthCredential =
      await this.authCredentialRepository.findByUserAndType(user.id, provider);

    if (existingOAuthCredential) {
      // OAuth credential already exists for this user and provider
      // This could happen if the email was updated - update the credential
      await this.authCredentialRepository.updateById(
        existingOAuthCredential.id,
        {
          identifier: providerId,
          metadata: {
            currentEmail: userData.email,
            emailHistory: [userData.email],
            lastEmailUpdate: new Date().toISOString(),
            provider: provider,
            linkedAt: new Date().toISOString(),
            isPrivateEmail: userData.isPrivateEmail || false,
            realUserStatus: userData.realUserStatus || 'unknown',
          },
        },
      );
    } else {
      // Create new OAuth credential for existing user
      await this.authCredentialRepository.createWithUser(
        user.id,
        provider,
        providerId,
        {
          currentEmail: userData.email,
          emailHistory: [userData.email],
          provider: provider,
          linkedAt: new Date().toISOString(),
          isPrivateEmail: userData.isPrivateEmail || false,
          realUserStatus: userData.realUserStatus || 'unknown',
        },
      );
    }

    // Update user email if it's different (OAuth emails are considered verified)
    if (user.email !== userData.email) {
      await this.userRepository.updateById(user.id, {
        email: userData.email,
        emailVerifiedAt: new Date(),
      });
    }
  }

  /**
   * Create new user for OAuth registration
   */
  private async createNewOAuthUser(
    provider: AuthProvider,
    userData: OAuthUserData,
    providerId: string,
    role?: AuthRole,
  ): Promise<User> {
    // Create new user
    const user = await this.userRepository.create({
      email: userData.email,
      emailVerifiedAt: new Date(), // OAuth emails are pre-verified
      phoneNumber: null,
      phoneVerifiedAt: null,
      otpSecret: null,
      isPolicyAllowed: false,
    });

    // Create auth credential for OAuth provider with metadata
    await this.authCredentialRepository.createWithUser(
      user.id,
      provider,
      providerId,
      {
        currentEmail: userData.email,
        emailHistory: [userData.email],
        provider: provider,
        registeredAt: new Date().toISOString(),
        name: userData.name,
        isPrivateEmail: userData.isPrivateEmail || false,
        realUserStatus: userData.realUserStatus || 'unknown',
      },
    );

    // Assign role from parameter or default to RIDER
    await this.authRoleService.assignRoleToUser(
      user.id,
      role || AuthRole.RIDER,
    );

    return user as User;
  }

  /**
   * Create admin user with password (for seeding)
   * @param email Email address
   * @param password Password
   * @param role Role for the user
   * @returns Created user
   */
  async createAdminWithPassword(
    email: string,
    password: string,
    role: AuthRole,
  ): Promise<User> {
    // Check if user already exists
    let user = await this.userRepository.findByEmail(email);

    if (!user) {
      // Create new user
      user = await this.userRepository.create({
        email,
        emailVerifiedAt: new Date(), // Admin users are pre-verified
        phoneNumber: null,
        phoneVerifiedAt: null,
        otpSecret: null,
        isPolicyAllowed: true,
      });

      // Hash password and store as credential
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await this.authCredentialRepository.createWithUser(
        user.id,
        'PASSWORD' as AuthProvider,
        hashedPassword, // Store hashed password as identifier
      );

      // Assign role to user
      await this.authRoleService.assignRoleToUser(user.id, role);
    } else {
      // Update existing user's password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Find existing password credential
      const existingCredential =
        await this.authCredentialRepository.findByUserAndType(
          user.id,
          'PASSWORD' as AuthProvider,
        );

      if (existingCredential) {
        // Update existing password
        await this.authCredentialRepository.updateById(existingCredential.id, {
          identifier: hashedPassword,
        });
      } else {
        // Create new password credential
        await this.authCredentialRepository.createWithUser(
          user.id,
          'PASSWORD' as AuthProvider,
          hashedPassword,
        );
      }
    }

    return user as User;
  }
}
