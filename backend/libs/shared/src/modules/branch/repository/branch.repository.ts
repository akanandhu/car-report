import { Injectable } from '@nestjs/common';
import { Branch } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class BranchRepository extends BaseRepository<Branch> {
  protected readonly modelName = 'branch';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
