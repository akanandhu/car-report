import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedAuthService } from './auth.service';
import { SharedAuthTokenService } from './service/auth-token.service';
import { SharedAuthOtpService } from './service/auth-otp.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { REPOSITORY_PROVIDERS } from '@shared/common/providers/repository.providers';
import { SharedUserModule } from '../user/user.module';
import { SharedUserroleModule } from '../userrole/userrole.module';
import { SharedBranchModule } from '../branch/branch.module';

@Module({
  imports: [
    PrismaModule,
    SharedUserModule,
    SharedUserroleModule,
    SharedBranchModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    SharedAuthService,
    SharedAuthTokenService,
    SharedAuthOtpService,
    JwtStrategy,
    ...REPOSITORY_PROVIDERS,
  ],
  exports: [SharedAuthService, SharedAuthTokenService, JwtStrategy, PassportModule],
})
export class SharedAuthModule { }
