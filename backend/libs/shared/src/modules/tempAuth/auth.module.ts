import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AppConfigModule } from '@shared/shared/config';
import { UserOnboardingModule } from '../user-onboarding/user-onboarding.module';
import { UserProfileModule } from '../user-profile/user-profile.module';
import { AuthService } from './auth.service';
import { AuthRoleService } from './auth-role.service';
import {
  AuthCredentialRepository,
  PermissionRepository,
  RefreshTokenRepository,
  RoleRepository,
  UserRepository,
  UserRoleRepository,
} from '@shared/shared/repositories';
import { AuthGoogleService } from './services/auth-google.service';
import { AppleAuthService } from './services/apple-auth.service';
import { AppleEmailManagerService } from './services/apple-email-manager.service';
import {
  AuthenticationService,
  OAuthService,
  OtpService,
  TokenService,
  UserRegistrationService,
} from './services';
import { PermissionsGuard } from './guards/permissions.guard';
import { RolesGuard } from './guards/roles.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { PrismaService } from '@shared/shared/database/prisma/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserProfileRepository } from '@shared/shared/repositories/user-profile.repository';
import { NotificationService } from '@shared/shared/common/notifications/engagespot/engagespot.service';
import { CommonModule } from '@shared/shared/common/common.module';
// import { CaslModule } from '../casl/casl.module';

@Module({
  imports: [
    AppConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}), // We'll configure JWT in the service
    UserOnboardingModule,
    UserProfileModule,
    // CaslModule,
    CommonModule
  ],
  providers: [
    AuthService,
    AuthRoleService,
    UserRepository,
    AuthCredentialRepository,
    RefreshTokenRepository,
    NotificationService,
    RoleRepository,
    UserRoleRepository,
    UserProfileRepository,
    JwtStrategy,
    JwtAuthGuard,
    JwtRefreshGuard,
    RolesGuard,
    PermissionsGuard,
    PrismaService,
    OtpService,
    OAuthService,
    TokenService,
    UserRegistrationService,
    AuthenticationService,
    AppleAuthService,
    AppleEmailManagerService,
    AuthGoogleService,
    PermissionRepository,
  ],
  exports: [
    AuthService,
    AuthRoleService,
    JwtAuthGuard,
    JwtRefreshGuard,
    RolesGuard,
    PermissionsGuard,
    PassportModule,
    TokenService,
  ],
})
export class AuthModule { }
