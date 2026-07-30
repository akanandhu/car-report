import { Module } from '@nestjs/common';
import { SharedBranchService } from './branch.service';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { REPOSITORY_PROVIDERS } from '@shared/common/providers/repository.providers';

@Module({
  imports: [PrismaModule],
  providers: [SharedBranchService, ...REPOSITORY_PROVIDERS],
  exports: [SharedBranchService],
})
export class SharedBranchModule {}
