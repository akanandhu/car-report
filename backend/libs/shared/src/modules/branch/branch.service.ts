import { Injectable } from '@nestjs/common';
import { BranchUtilsService } from './service/branch.utils.service';
import { BranchRepository } from './repository/branch.repository';

@Injectable()
export class SharedBranchService {
  constructor(
    private readonly branchUtilsService: BranchUtilsService,
    private readonly branchRepository: BranchRepository,
  ) { }

  /**
   * Create a default branch for a user
   * @param userId - User ID
   * @param branchName - Optional branch name (defaults to "Main Branch")
   */
  async createDefaultBranch(userId: string, branchName = 'Main Branch') {
    return this.branchRepository.create({
      name: branchName,
      address: 'Default Address',
      ownerId: userId,
    });
  }
}
