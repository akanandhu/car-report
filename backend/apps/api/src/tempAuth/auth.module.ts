import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthModule as SharedAuthModule } from '@shared/modules/tempAuth/auth.module';
import { SharedUserModule } from '@shared/modules/user/user.module';

@Module({
  imports: [SharedAuthModule, SharedUserModule],
  controllers: [AuthController],
  providers: [],
})
export class ApiAuthModule {}
