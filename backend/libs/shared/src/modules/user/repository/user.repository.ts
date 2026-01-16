import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from 'libs/shared/database/prisma/prisma.service';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  protected readonly modelName = 'user';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}