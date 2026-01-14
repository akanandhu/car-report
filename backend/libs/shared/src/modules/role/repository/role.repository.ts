import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from 'libs/shared/database/prisma/prisma.service';

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  protected readonly modelName = 'role';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
