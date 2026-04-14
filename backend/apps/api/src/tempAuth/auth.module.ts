import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SharedUserModule } from '@shared/modules/user/user.module';

@Module({
  imports: [SharedUserModule],
  controllers: [AuthController],
  providers: [],
})
export class ApiAuthModule {}
