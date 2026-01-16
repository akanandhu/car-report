import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { SharedBranchModule } from '@shared/modules/branch/branch.module';

@Module({
  imports: [SharedBranchModule],
  controllers: [BranchController],
})
export class BranchModule {}
