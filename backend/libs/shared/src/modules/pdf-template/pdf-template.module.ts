import { Module } from '@nestjs/common';
import { SharedPdfTemplateService } from './pdf-template.service';
import { PdfTemplateUtilsService } from './service/pdf-template.utils.service';
import { PdfTemplateRepository } from './repository/pdf-template.repository';

@Module({
  providers: [SharedPdfTemplateService, PdfTemplateUtilsService, PdfTemplateRepository],
  exports: [SharedPdfTemplateService],
})
export class SharedPdfTemplateModule {}
