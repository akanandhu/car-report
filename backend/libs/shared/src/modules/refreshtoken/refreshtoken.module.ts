import { Module } from '@nestjs/common';
import { SharedRefreshtokenService } from './refreshtoken.service';
import { RefreshtokenUtilsService } from './service/refreshtoken.utils.service';
import { RefreshtokenRepository } from './repository/refreshtoken.repository';

@Module({
  providers: [SharedRefreshtokenService, RefreshtokenUtilsService, RefreshtokenRepository],
  exports: [SharedRefreshtokenService],
})
export class SharedRefreshtokenModule {}
