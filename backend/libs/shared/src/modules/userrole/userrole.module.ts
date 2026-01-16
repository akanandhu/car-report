import { Module } from '@nestjs/common';
import { SharedUserroleService } from './userrole.service';
import { UserroleUtilsService } from './service/userrole.utils.service';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { REPOSITORY_PROVIDERS } from '@shared/common/providers/repository.providers';

@Module({
  imports: [PrismaModule],
  providers: [SharedUserroleService, UserroleUtilsService, ...REPOSITORY_PROVIDERS],
  exports: [SharedUserroleService],
})
export class SharedUserroleModule { }
