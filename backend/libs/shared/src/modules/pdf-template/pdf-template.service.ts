import { Injectable } from '@nestjs/common';
import { PdfTemplateUtilsService } from './service/pdf-template.utils.service';
import { PdfTemplateRepository } from './repository/pdf-template.repository';

@Injectable()
export class SharedPdfTemplateService {
  constructor(
    private readonly pdfTemplateUtilsService: PdfTemplateUtilsService,
    private readonly pdfTemplateRepository: PdfTemplateRepository,
  ) {}
}
