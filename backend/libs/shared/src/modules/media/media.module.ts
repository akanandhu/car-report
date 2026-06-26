import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { SharedMediaService } from './media.service';

@Module({
  imports: [PrismaModule],
  providers: [SharedMediaService],
  exports: [SharedMediaService],
})
export class SharedMediaModule {}
