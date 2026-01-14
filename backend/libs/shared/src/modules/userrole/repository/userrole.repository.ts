import { Injectable } from '@nestjs/common';
import { Userrole } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from 'libs/shared/database/prisma/prisma.service';

@Injectable()
export class UserroleRepository extends BaseRepository<Userrole> {
  protected readonly modelName = 'userrole';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
