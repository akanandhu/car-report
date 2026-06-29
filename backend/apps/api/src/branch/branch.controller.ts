import { Controller, UseGuards } from '@nestjs/common';
import { SharedBranchService } from '@shared/modules/branch/branch.service';
import { JwtAuthGuard } from '@shared/modules/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('branchs')
export class BranchController {
  constructor(private readonly sharedBranchService: SharedBranchService) {}
}
