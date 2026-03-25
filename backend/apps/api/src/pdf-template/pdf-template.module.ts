import { Module } from '@nestjs/common';
import { PdfTemplateController } from './pdf-template.controller';
import { SharedPdfTemplateModule } from '@shared/modules/pdf-template/pdf-template.module';

@Module({
  imports: [SharedPdfTemplateModule],
  controllers: [PdfTemplateController],
})
export class PdfTemplateModule {}
