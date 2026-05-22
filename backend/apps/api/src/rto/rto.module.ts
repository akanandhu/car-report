import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { RtoController } from './rto.controller';
import { RtoService } from './rto.service';

@Module({
  imports: [PrismaModule],
  controllers: [RtoController],
  providers: [RtoService],
})
export class RtoModule {}
