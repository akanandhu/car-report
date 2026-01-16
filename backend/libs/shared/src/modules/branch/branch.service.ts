import { Injectable } from '@nestjs/common';
import { BranchUtilsService } from './service/branch.utils.service';
import { BranchRepository } from './repository/branch.repository';

@Injectable()
export class SharedBranchService {
  constructor(
    private readonly branchUtilsService: BranchUtilsService,
    private readonly branchRepository: BranchRepository,
  ) {}
}
