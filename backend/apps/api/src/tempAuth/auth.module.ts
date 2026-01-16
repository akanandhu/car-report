import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule as SharedAuthModule } from '@shared/shared';
import { UserModule as SharedUserModule } from '@shared/shared/modules/user/user.module';

@Module({
  imports: [SharedAuthModule, SharedUserModule],
  controllers: [AuthController],
  providers: [],
})
export class ApiAuthModule {}
