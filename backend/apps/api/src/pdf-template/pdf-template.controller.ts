import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SharedPdfTemplateService } from '@shared/modules/pdf-template/pdf-template.service';
import { PdfTemplateRepository } from '@shared/modules/pdf-template/repository/pdf-template.repository';
import { JwtAuthGuard } from '@shared/modules/auth/guards/jwt-auth.guard';
import { CreatePdfTemplateDto, UpdatePdfTemplateDto, PdfTemplateResponseDto } from './dto/pdf-template.dto';

@ApiTags('Pdf Templates')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('pdf-templates')
export class PdfTemplateController {
  constructor(
    private readonly sharedPdfTemplateService: SharedPdfTemplateService,
    private readonly pdfTemplateRepository: PdfTemplateRepository,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pdf template' })
  @ApiResponse({ status: 201, type: PdfTemplateResponseDto })
  async create(@Body() dto: CreatePdfTemplateDto) {
    return this.pdfTemplateRepository.create({
      identifier: dto.identifier,
      name: dto.name,
      description: dto.description || null,
      clientId: dto.clientId || null,
    });
  }

  @Get()
  @ApiOperation({ summary: 'List all pdf templates' })
  @ApiResponse({ status: 200, type: [PdfTemplateResponseDto] })
  async findAll() {
    return this.pdfTemplateRepository.findMany({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pdf template by ID' })
  @ApiResponse({ status: 200, type: PdfTemplateResponseDto })
  async findOne(@Param('id') id: string) {
    return this.pdfTemplateRepository.findUnique({ where: { id } });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a pdf template' })
  @ApiResponse({ status: 200, type: PdfTemplateResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdatePdfTemplateDto) {
    return this.pdfTemplateRepository.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description === undefined ? undefined : dto.description || null,
        clientId: dto.clientId === undefined ? undefined : dto.clientId || null,
      },
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pdf template' })
  async remove(@Param('id') id: string) {
    return this.pdfTemplateRepository.hardDelete({ where: { id } });
  }
}
