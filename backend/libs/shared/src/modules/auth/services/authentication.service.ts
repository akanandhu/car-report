import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthTokensWithProfileDto } from 'apps/api/src/v1/auth/dto/auth-tokens-with-profile.dto';
import { OtpService } from './otp.service';
import { OAuthService, OAuthUserData } from './oauth.service';
import { TokenService } from './token.service';
import { UserRegistrationService } from './user-registration.service';
import {
  RoleRepository,
  UserRepository,
  UserRoleRepository,
  AuthCredentialRepository,
  RefreshTokenRepository,
} from '@shared/repositories';
import { UserProfileRepository } from '@shared/repositories/user-profile.repository';
import { AuthRoleService } from '../auth-role.service';
import {
  AuthProvider,
  AuthRole,
} from '@shared/common/constants/constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly userProfileRepository: UserProfileRepository,
    private readonly authRoleService: AuthRoleService,
    private readonly otpService: OtpService,
    private readonly oauthService: OAuthService,
    private readonly tokenService: TokenService,
    private readonly userRegistrationService: UserRegistrationService,
    private readonly authCredentialRepository: AuthCredentialRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  /**
   * Ensure user has role and get user profile
   * @param userId User ID
   * @param roleName Role name
   * @returns User profile for the role
   */
  private async ensureUserRoleAndProfile(userId: string, roleName: string) {
    const role = await this.roleRepository.findByName(roleName);
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    // Check if user has this role assigned, if not assign it
    const hasRole = await this.userRoleRepository.userHasRole(userId, roleName);
    if (!hasRole) {
      await this.authRoleService.assignRoleToUser(userId, roleName as any);
    }

    // Find or create user profile for this role
    const userProfile =
      await this.userProfileRepository.findOrCreateByUserIdAndRoleId(
        userId,
        role.id,
        roleName,
      );

    return { role, userProfile };
  }

  /**
   * Login with phone number and OTP
   * @param phoneNumber Phone number in international format
   * @param otp OTP code
   * @param roleName Role name
   * @returns Auth tokens
   */
  async loginWithPhone(
    phoneNumber: string,
    otp: string,
    roleName?: string,
  ): Promise<AuthTokensWithProfileDto> {
    const isValid = await this.otpService.verifyPhoneOtp(phoneNumber, otp);
    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const user = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!roleName) {
      throw new BadRequestException('Role name is required');
    }

    const { role, userProfile } = await this.ensureUserRoleAndProfile(
      user.id,
      roleName,
    );

    return this.tokenService.generateTokens(user.id, role, userProfile);
  }

  /**
   * Login with email address and OTP
   * @param email Email address
   * @param otp OTP code
   * @param roleName Role name
   * @returns Auth tokens
   */
  async loginWithEmail(
    email: string,
    otp: string,
    roleName?: string,
  ): Promise<AuthTokensWithProfileDto> {
    const isValid = await this.otpService.verifyEmailOtp(email, otp);
    if (!isValid) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!roleName) {
      throw new BadRequestException('Role name is required');
    }

    const { role, userProfile } = await this.ensureUserRoleAndProfile(
      user.id,
      roleName,
    );

    return this.tokenService.generateTokens(user.id, role, userProfile);
  }

  /**
   * Login with OAuth provider
   * @param provider OAuth provider (google, apple)
   * @param accessToken OAuth access token
   * @param role Role for the user
   * @returns Auth tokens
   */
  async loginWithOAuth(
    provider: AuthProvider,
    accessToken: string,
    role?: AuthRole,
  ): Promise<AuthTokensWithProfileDto> {
    try {
      const userData: OAuthUserData = await this.oauthService.verifyOAuthToken(
        provider,
        accessToken,
      );

      if (!userData || !userData.email) {
        console.error(
          `[OAuth] Invalid ${provider} token - missing user data or email`,
        );
        throw new UnauthorizedException('Invalid OAuth token');
      }
      const user = await this.userRegistrationService.registerWithOAuth(
        provider,
        userData,
        role,
      );

      const roleName = role || AuthRole.RIDER;
      const { role: roleObj, userProfile } =
        await this.ensureUserRoleAndProfile(user.id, roleName);

      console.log(
        `[OAuth] Successfully authenticated user ${user.id} with ${provider}`,
      );

      return this.tokenService.generateTokens(user.id, roleObj, userProfile);
    } catch (error) {
      console.error(
        `[OAuth] ${provider} login failed:`,
        error instanceof Error ? error.message : String(error),
      );
      throw error;
    }
  }

  /**
   * Refresh access token using refresh token
   * @param refreshToken Refresh token
   * @returns New access token, refresh token, and expiry
   */
  async refreshToken(
    refreshToken: string,
    roleName: string,
  ): Promise<AuthTokensWithProfileDto> {
    const userId =
      await this.tokenService.validateAndRevokeRefreshToken(refreshToken);

    // Get user roles to determine the role for the token
    if (!roleName) {
      const userRoles = await this.authRoleService.getUserRoles(userId);

      if (userRoles.length === 0) {
        throw new UnauthorizedException('User has no assigned roles');
      }

      roleName = userRoles[0];
    }
    const role = await this.roleRepository.findByName(roleName);
    if (!role) {
      throw new NotFoundException(`Role '${roleName}' not found`);
    }

    // Get user profile for this role
    const userProfile =
      await this.userProfileRepository.getOneByUserIdAndRoleId(userId, role.id);
    if (!userProfile) {
      throw new UnauthorizedException(`User doesnt have this ${roleName} role`);
    }

    return this.tokenService.generateTokens(
      userId,
      role,
      userProfile || undefined,
    );
  }

  /**
   * Login with email and password (for admin users)
   * @param email Email address
   * @param password Password
   * @returns Auth tokens
   */
  async loginWithPassword(
    email: string,
    password: string,
    roleName: string,
  ): Promise<AuthTokensWithProfileDto> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    console.log(`login from ${email} with header ${roleName}`);
    // Find password credential for this user
    const passwordCredential =
      await this.authCredentialRepository.findByUserAndType(
        user.id,
        'PASSWORD' as AuthProvider,
      );

    if (!passwordCredential) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      password,
      passwordCredential.identifier,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const userProfiles = await this.userProfileRepository.findMany({
      where: { userId: user.id },
      include: { role: true },
    });

    // Check if user profile status is active
    if (userProfiles.length === 0) {
      throw new UnauthorizedException('User profile not found');
    }
    //check any userprofilestaus active

    if (userProfiles.some((profile) => profile.status === 'active')) {
      const userProfile = userProfiles.find(
        (profile) => profile.status === 'active',
      );

      return this.tokenService.generateTokens(
        user.id,
        userProfile?.role,
        userProfile,
      );
    } else {
      throw new UnauthorizedException(
        'Account is not active. Please contact administrator.',
      );
    }
  }

  /**
   * Reset password using OTP verification
   * @param email Email address
   * @param otp OTP code
   * @param newPassword New password
   * @returns True if password was reset successfully
   */
  async resetPassword(
    email: string,
    otp: string,
    newPassword: string,
    roleName: string,
  ): Promise<boolean> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    // Verify OTP (this will also check if user has super_admin role)
    if (!user.otpSecret) {
      throw new UnauthorizedException('No OTP found for this email');
    }

    const isOtpValid = await this.otpService.verifyForgotPasswordOtp(
      email,
      otp,
      roleName,
    );

    if (!isOtpValid) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

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

    // Clear OTP secret after successful password reset
    await this.userRepository.updateById(user.id, {
      otpSecret: null,
    });

    return true;
  }

  /**
   * Logout user by revoking all refresh tokens
   * @param userId User ID to logout
   * @returns True if logout was successful
   */
  async logout(userId: string): Promise<boolean> {
    try {
      // Revoke all refresh tokens for the user
      await this.refreshTokenRepository.revokeAllUserTokens(userId);
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      throw new UnauthorizedException('Failed to logout user');
    }
  }
}
