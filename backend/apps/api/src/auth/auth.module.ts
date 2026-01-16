import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SharedAuthModule } from '@shared/modules/auth/auth.module';

@Module({
  imports: [SharedAuthModule],
  controllers: [AuthController],
})
export class AuthModule {}
