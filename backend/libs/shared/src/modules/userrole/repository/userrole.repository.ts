import { Injectable } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class UserroleRepository extends BaseRepository<UserRole> {
  protected readonly modelName = 'userRole';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
