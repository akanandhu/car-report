import { Injectable } from '@nestjs/common';
import { Auth } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class AuthRepository extends BaseRepository<Auth> {
  protected readonly modelName = 'auth';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
