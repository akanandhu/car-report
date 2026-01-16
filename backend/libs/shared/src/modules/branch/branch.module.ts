import { Module } from '@nestjs/common';
import { SharedBranchService } from './branch.service';
import { BranchUtilsService } from './service/branch.utils.service';
import { BranchRepository } from './repository/branch.repository';

@Module({
  providers: [SharedBranchService, BranchUtilsService, BranchRepository],
  exports: [SharedBranchService],
})
export class SharedBranchModule {}
