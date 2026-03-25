import { Injectable } from '@nestjs/common';
import { PdfTemplate } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class PdfTemplateRepository extends BaseRepository<PdfTemplate> {
  protected readonly modelName = 'pdfTemplate';

  constructor(prisma: PrismaService) {
    super(prisma);
  }
}
