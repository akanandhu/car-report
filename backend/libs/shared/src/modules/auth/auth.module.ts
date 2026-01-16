import { Module } from '@nestjs/common';
import { SharedAuthService } from './auth.service';
import { AuthUtilsService } from './service/auth.utils.service';
import { AuthRepository } from './repository/auth.repository';

@Module({
  providers: [SharedAuthService, AuthUtilsService, AuthRepository],
  exports: [SharedAuthService],
})
export class SharedAuthModule {}
