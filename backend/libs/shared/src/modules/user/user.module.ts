import { Module } from '@nestjs/common';
import { SharedUserService } from './user.service';

import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { REPOSITORY_PROVIDERS } from '@shared/common/providers/repository.providers';
import { SharedUserroleModule } from '../userrole/userrole.module';
import { SharedBranchModule } from '../branch/branch.module';

@Module({
  imports: [PrismaModule, SharedUserroleModule, SharedBranchModule],
  providers: [SharedUserService, ...REPOSITORY_PROVIDERS],
  exports: [SharedUserService],
})
export class SharedUserModule {}
