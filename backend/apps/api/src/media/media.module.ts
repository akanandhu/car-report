import { Module } from '@nestjs/common';
import { SharedMediaModule } from '@shared/modules/media/media.module';
import { MediaController } from './media.controller';

@Module({
  imports: [SharedMediaModule],
  controllers: [MediaController],
})
export class MediaModule {}
