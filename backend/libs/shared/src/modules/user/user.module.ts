import { Module } from '@nestjs/common';
import { SharedUserService } from './user.service';
import { UserUtilsService } from './service/user.utils.service';

@Module({
  providers: [SharedUserService, UserUtilsService],
  exports: [SharedUserService],
})
export class SharedUserModule {}
