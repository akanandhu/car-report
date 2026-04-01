import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SharedClientTemplateService } from '@shared/modules/client-template/client-template.service';
import { JwtAuthGuard } from '@shared/modules/auth/guards/jwt-auth.guard';
import { AddClientTemplateDto, ClientTemplateResponseDto } from './dto/client-template.dto';

@ApiTags('Client Templates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('client-templates')
export class ClientTemplateController {
  constructor(
    private readonly sharedClientTemplateService: SharedClientTemplateService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add or update client template' })
  @ApiResponse({ status: 200, type: ClientTemplateResponseDto })
  async addOrUpdate(@Req() req: any, @Body() dto: AddClientTemplateDto) {
    const user = req.user;
    const clientId = user.clientId || user.id;

    return this.sharedClientTemplateService.upsertClientTemplate(clientId, dto.pdfTemplateId);
  }

  @Get()
  @ApiOperation({ summary: 'List client templates' })
  @ApiResponse({ status: 200, type: [ClientTemplateResponseDto] })
  async listClientTemplates(@Req() req: any) {
    const user = req.user;
    const clientId = user.clientId || user.id;

    return this.sharedClientTemplateService.listByClientId(clientId);
  }
}
