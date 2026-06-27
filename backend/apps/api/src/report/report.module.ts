import { Module } from '@nestjs/common';
import { PrismaModule } from '@shared/database/prisma/prisma.module';
import { SharedMediaModule } from '@shared/modules/media/media.module';
import { ReportBrowserService } from './report-browser.service';
import { ReportController } from './report.controller';
import { ReportMediaService } from './report-media.service';
import { ReportService } from './report.service';
import { ReportTemplateService } from './report-template.service';

@Module({
  imports: [PrismaModule, SharedMediaModule],
  controllers: [ReportController],
  providers: [
    ReportBrowserService,
    ReportMediaService,
    ReportService,
    ReportTemplateService,
  ],
})
export class ReportModule {}
