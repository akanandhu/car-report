import { Controller } from '@nestjs/common';
import { SharedBranchService } from '@shared/modules/branch/branch.service';

@Controller('branchs')
export class BranchController {
  constructor(
    private readonly sharedBranchService: SharedBranchService,
  ) {}
}
