import { Injectable } from '@nestjs/common';
import { ClientTemplate } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class ClientTemplateRepository extends BaseRepository<ClientTemplate> {
  protected readonly modelName = 'clientTemplate';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
