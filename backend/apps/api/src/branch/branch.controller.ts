import { Controller } from '@nestjs/common';
import { SharedBranchService } from '@shared/modules/branch/branch.service';
import { BranchRepository } from '@shared/modules/branch/repository/branch.repository';

@Controller('branchs')
export class BranchController {
  constructor(
    private readonly sharedBranchService: SharedBranchService,
    private readonly branchRepository: BranchRepository,
  ) {}
}
