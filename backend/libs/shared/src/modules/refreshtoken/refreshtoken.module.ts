import { Module } from '@nestjs/common';
import { SharedRefreshtokenService } from './refreshtoken.service';
import { RefreshtokenRepository } from './repository/refreshtoken.repository';

@Module({
  providers: [SharedRefreshtokenService, RefreshtokenRepository],
  exports: [SharedRefreshtokenService, RefreshtokenRepository],
})
export class SharedRefreshtokenModule {}
