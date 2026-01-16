import { Module } from '@nestjs/common';
import { RefreshtokenController } from './refreshtoken.controller';
import { SharedRefreshtokenModule } from '@shared/modules/refreshtoken/refreshtoken.module';

@Module({
  imports: [SharedRefreshtokenModule],
  controllers: [RefreshtokenController],
})
export class RefreshtokenModule {}
