import {
  Controller,
  Get,
  Header,
  Param,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { ReportService } from './report.service';

@ApiTags('Reports')
@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('vehicles/:id/report.pdf')
  @Header('Content-Type', 'application/pdf')
  @ApiOperation({ summary: 'Generate vehicle evaluation report PDF' })
  @ApiParam({ name: 'id', description: 'Vehicle ID' })
  @ApiResponse({
    status: 200,
    description: 'PDF report generated successfully',
  })
  async generateVehicleReport(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const report = await this.reportService.generateVehicleReportPdf(id);

    response.set({
      'Content-Disposition': `attachment; filename="${report.fileName}"`,
      'Content-Length': report.buffer.length,
      'Cache-Control': 'no-store',
    });

    return new StreamableFile(report.buffer);
  }
}
