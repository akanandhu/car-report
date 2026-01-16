import { Module } from '@nestjs/common';
import { SharedUserService } from './user.service';
import { UserUtilsService } from './service/user.utils.service';
import { PrismaModule } from '@shared/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SharedUserService, UserUtilsService],
  exports: [SharedUserService],
})
export class SharedUserModule { }

