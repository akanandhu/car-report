import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '@shared/config';
import {
  PermissionRepository,
  RefreshTokenRepository,
  // RoleRepository,
  UserRepository,
} from '@shared/repositories';
import { Role } from '@shared/repositories/models/role.model';
import { UserProfile } from '@shared/repositories/models/userProfile.model';
import { UserProfileRepository } from '@shared/repositories/user-profile.repository';
import { AuthTokensWithProfileDto } from 'apps/api/src/v1/auth/dto';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userRepository: UserRepository,
    // private readonly roleRepository: RoleRepository,
    private readonly userProfileRepository: UserProfileRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  /**
   * Parse duration strings like '7d', '15m', '1h' to milliseconds
   * @param durationStr Duration string (e.g., '7d', '15m', '1h')
   * @returns Duration in milliseconds
   */
  private parseDuration(durationStr: string): number {
    const match = durationStr.match(/^(\d+)([smhdw])$/);
    if (!match) return 0;

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        return value * 1000; // seconds to ms
      case 'm':
        return value * 60 * 1000; // minutes to ms
      case 'h':
        return value * 60 * 60 * 1000; // hours to ms
      case 'd':
        return value * 24 * 60 * 60 * 1000; // days to ms
      case 'w':
        return value * 7 * 24 * 60 * 60 * 1000; // weeks to ms
      default:
        return 0;
    }
  }

  /**
   * Generate a random refresh token string
   * @returns Random string for refresh token
   */
  private generateRefreshTokenString(): string {
    return require('crypto').randomBytes(40).toString('hex');
  }

  /**
   * Generate JWT tokens for a user
   * @param userId User ID
   * @param role Role object
   * @param userProfile User profile (optional)
   * @returns Access token, refresh token, and expiry
   */
  async generateTokens(
    userId: string,
    role?: Role,
    userProfile?: UserProfile,
  ): Promise<AuthTokensWithProfileDto> {
    // const roleName: string = role.name;
    console.log('role', role);
    const { profileIds, roleIds, roleNames } =
      await this.userProfileRepository.getUserRoleIdsAndNames(userId);
    const permissions =
      await this.permissionRepository.getUserPermissions(roleIds);
    // const roleWithPermissions =
    //   await this.roleRepository.getRoleWithPermissionsByName(roleName);
    console.log('roleNamesWithPermissions', roleNames);
    const payload = {
      sub: userId,
      roles: roleNames,
      permissions: permissions.map((p: any) => p.name),
      profileId: userProfile?.id || null,
      profileIds,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.jwtSecret,
      expiresIn: this.configService.jwtAccessTokenExpiry,
    });

    const refreshToken = this.generateRefreshTokenString();

    const refreshExpiryMs = this.parseDuration(
      this.configService.jwtRefreshTokenExpiry as string,
    );
    const expiresAt = new Date(Date.now() + refreshExpiryMs);

    await this.refreshTokenRepository.createToken(
      userId,
      refreshToken,
      expiresAt,
    );

    const accessExpiryMs = this.parseDuration(
      this.configService.jwtAccessTokenExpiry as string,
    );

    const isProfileUpdated = !!(
      userProfile?.firstName && userProfile?.lastName
    );

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with ID '${userId}' not found`);
    }

    return {
      accessToken,
      refreshToken,
      expiresIn: Math.floor(accessExpiryMs / 1000),
      isProfileUpdated,
      emailVerified: !!user.emailVerifiedAt,
      phoneVerified: !!user.phoneVerifiedAt,
      isPolicyAllowed: user.isPolicyAllowed || false,
      phoneNumber: user?.phoneNumber ?? null,
      email: user?.email ?? null,
      userId: user.id,
      userProfileId: userProfile?.id ?? null,
    };
  }

  /**
   * Validate and revoke refresh token
   * @param refreshToken Refresh token to validate and revoke
   * @returns User ID from the token
   */
  async validateAndRevokeRefreshToken(refreshToken: string): Promise<string> {
    const storedToken =
      await this.refreshTokenRepository.findByToken(refreshToken);

    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    await this.refreshTokenRepository.revokeToken(refreshToken);

    return storedToken.userId;
  }
}
