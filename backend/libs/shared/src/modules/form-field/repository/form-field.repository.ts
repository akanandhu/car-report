import { Injectable } from '@nestjs/common';
import { FormField } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class FormFieldRepository extends BaseRepository<FormField> {
  protected readonly modelName = 'formField';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
