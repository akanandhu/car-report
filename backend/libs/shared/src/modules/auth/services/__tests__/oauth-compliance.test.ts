import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UserRegistrationService } from '../user-registration.service';
import { AuthCredentialRepository } from '@shared/repositories/auth-credential.repository';
import { UserRepository } from '@shared/repositories/user.repository';
import { AuthRoleService } from '../../auth-role.service';
import {
  AuthProvider,
  AuthRole,
} from '@shared/common/constants/constants';
import { OAuthUserData } from '../oauth.service';

describe('OAuth Compliance Tests', () => {
  let service: UserRegistrationService;
  let authCredentialRepository: jest.Mocked<AuthCredentialRepository>;
  let userRepository: jest.Mocked<UserRepository>;
  let authRoleService: jest.Mocked<AuthRoleService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRegistrationService,
        {
          provide: AuthCredentialRepository,
          useValue: {
            findByTypeAndIdentifier: jest.fn(),
            findByUserAndType: jest.fn(),
            createWithUser: jest.fn(),
            updateById: jest.fn(),
            updateMetadata: jest.fn(),
          },
        },
        {
          provide: UserRepository,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            updateUserEmail: jest.fn(),
            updateById: jest.fn(),
          },
        },
        {
          provide: AuthRoleService,
          useValue: {
            assignRoleToUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserRegistrationService>(UserRegistrationService);
    authCredentialRepository = module.get(AuthCredentialRepository);
    userRepository = module.get(UserRepository);
    authRoleService = module.get(AuthRoleService);
  });

  describe('Apple Masked Email Handling', () => {
    it('should handle Apple masked email changes correctly', async () => {
      const appleId = 'apple_user_123';
      const oldEmail = 'abc123@privaterelay.appleid.com';
      const newEmail = 'def456@privaterelay.appleid.com';

      const existingUser = { id: 'user_123', email: oldEmail };
      const existingCredential = {
        id: 'cred_123',
        user: existingUser,
        metadata: {
          currentEmail: oldEmail,
          emailHistory: [oldEmail],
          provider: AuthProvider.APPLE,
        },
      };

      const userData: OAuthUserData = {
        sub: appleId,
        id: appleId,
        email: newEmail,
        name: 'Test User',
        isPrivateEmail: true,
        realUserStatus: 'likelyReal',
      };

      authCredentialRepository.findByTypeAndIdentifier.mockResolvedValue(
        existingCredential,
      );
      userRepository.updateUserEmail.mockResolvedValue(existingUser as any);
      authCredentialRepository.updateMetadata.mockResolvedValue({} as any);

      const result = await service.registerWithOAuth(
        AuthProvider.APPLE,
        userData,
        AuthRole.RIDER,
      );

      expect(result).toBe(existingUser);
      expect(userRepository.updateUserEmail).toHaveBeenCalledWith(
        'user_123',
        newEmail,
      );
      expect(authCredentialRepository.updateMetadata).toHaveBeenCalledWith(
        'cred_123',
        expect.objectContaining({
          currentEmail: newEmail,
          emailHistory: [oldEmail, newEmail],
          isPrivateEmail: true,
          realUserStatus: 'likelyReal',
        }),
      );
    });

    it('should create new user for first-time Apple login', async () => {
      const appleId = 'apple_user_456';
      const email = 'xyz789@privaterelay.appleid.com';

      const userData: OAuthUserData = {
        sub: appleId,
        id: appleId,
        email,
        name: 'New User',
        isPrivateEmail: true,
        realUserStatus: 'likelyReal',
      };

      const newUser = { id: 'user_456', email };

      authCredentialRepository.findByTypeAndIdentifier.mockResolvedValue(null);
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.create.mockResolvedValue(newUser as any);
      authCredentialRepository.createWithUser.mockResolvedValue({} as any);
      authRoleService.assignRoleToUser.mockResolvedValue({} as any);

      const result = await service.registerWithOAuth(
        AuthProvider.APPLE,
        userData,
        AuthRole.RIDER,
      );

      expect(result).toBe(newUser);
      expect(userRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          email,
          emailVerifiedAt: expect.any(Date),
        }),
      );
      expect(authCredentialRepository.createWithUser).toHaveBeenCalledWith(
        'user_456',
        AuthProvider.APPLE,
        appleId,
        expect.objectContaining({
          currentEmail: email,
          emailHistory: [email],
          isPrivateEmail: true,
          realUserStatus: 'likelyReal',
        }),
      );
    });

    it('should link Apple account to existing email user', async () => {
      const appleId = 'apple_user_789';
      const email = 'user@example.com';

      const userData: OAuthUserData = {
        sub: appleId,
        id: appleId,
        email,
        name: 'Existing User',
        isPrivateEmail: false,
      };

      const existingUser = { id: 'user_789', email };

      authCredentialRepository.findByTypeAndIdentifier.mockResolvedValue(null);
      userRepository.findByEmail.mockResolvedValue(existingUser as any);
      authCredentialRepository.findByUserAndType.mockResolvedValue(null);
      authCredentialRepository.createWithUser.mockResolvedValue({} as any);
      userRepository.updateById.mockResolvedValue({} as any);

      const result = await service.registerWithOAuth(
        AuthProvider.APPLE,
        userData,
        AuthRole.RIDER,
      );

      expect(result).toBe(existingUser);
      expect(authCredentialRepository.createWithUser).toHaveBeenCalledWith(
        'user_789',
        AuthProvider.APPLE,
        appleId,
        expect.objectContaining({
          currentEmail: email,
          emailHistory: [email],
          isPrivateEmail: false,
        }),
      );
    });
  });

  describe('Email Uniqueness Validation', () => {
    it('should throw error when email is already used by different user', async () => {
      const appleId = 'apple_user_conflict';
      const email = 'conflict@example.com';

      const userData: OAuthUserData = {
        sub: appleId,
        id: appleId,
        email,
        name: 'Conflict User',
      };

      const existingUser = { id: 'user_existing', email };
      const currentUser = { id: 'user_current', email: 'old@example.com' };
      const existingCredential = {
        id: 'cred_current',
        user: currentUser,
        metadata: { currentEmail: 'old@example.com' },
      };

      authCredentialRepository.findByTypeAndIdentifier.mockResolvedValue(
        existingCredential,
      );
      userRepository.findByEmail.mockResolvedValue(existingUser as any);

      await expect(
        service.registerWithOAuth(AuthProvider.APPLE, userData, AuthRole.RIDER),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('Google OAuth Handling', () => {
    it('should handle Google login correctly', async () => {
      const googleId = 'google_user_123';
      const email = 'user@gmail.com';

      const userData: OAuthUserData = {
        sub: googleId,
        id: googleId,
        email,
        name: 'Google User',
      };

      const newUser = { id: 'user_google', email };

      authCredentialRepository.findByTypeAndIdentifier.mockResolvedValue(null);
      userRepository.findByEmail.mockResolvedValue(null);
      userRepository.create.mockResolvedValue(newUser as any);
      authCredentialRepository.createWithUser.mockResolvedValue({} as any);
      authRoleService.assignRoleToUser.mockResolvedValue({} as any);

      const result = await service.registerWithOAuth(
        AuthProvider.GOOGLE,
        userData,
        AuthRole.RIDER,
      );

      expect(result).toBe(newUser);
      expect(authCredentialRepository.createWithUser).toHaveBeenCalledWith(
        'user_google',
        AuthProvider.GOOGLE,
        googleId,
        expect.objectContaining({
          currentEmail: email,
          emailHistory: [email],
          provider: AuthProvider.GOOGLE,
        }),
      );
    });
  });
});
