import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { SharedDocumentGroupService } from '@shared/modules/document-group/document-group.service';
import {
  CreateDocumentGroupDto,
  DocumentGroupResponseDto,
  UpdateDocumentGroupDto,
} from './dto/document-group.dto';

@ApiTags('Document Groups')
@Controller('document-groups')
export class DocumentGroupController {
  constructor(private readonly service: SharedDocumentGroupService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new document group' })
  @ApiResponse({ status: 201, type: DocumentGroupResponseDto })
  async create(@Body() dto: CreateDocumentGroupDto) {
    return this.service.repository.create({
      name: dto.name,
      identifier: dto.identifier,
      description: dto.description || null,
      type: dto.type || null,
      parentId: dto.parentId || null,
      groupName: dto.groupName || null,
      order: dto.order ?? null,
      isEnabled: dto.isEnabled ?? true,
    });
  }

  @Get()
  @ApiOperation({
    summary: 'List all document groups (optionally filtered by vehicleId)',
  })
  @ApiQuery({
    name: 'groupId',
    required: false,
    description: 'Further filter by a specific group ID (used with vehicleId)',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    description:
      'List all document groups by type either FORM_STEP or FORM_TYPE',
  })
  @ApiResponse({ status: 200, type: [DocumentGroupResponseDto] })
  async findAll(
    @Query('vehicleId') vehicleId?: string,
    @Query('groupId') groupId?: string,
    @Query('type') type?: 'FORM_TYPE' | 'FORM_STEP',
  ) {
    if (vehicleId) {
      return this.service.listByVehicleId(vehicleId, groupId);
    }
    return this.service.repository.findMany({
      where: {
        ...(type && { type }),
      },
    });
  }

  @Get('by-vehicle/:vehicleId')
  @ApiOperation({
    summary: 'List document groups that have form data for a specific vehicle',
  })
  @ApiParam({ name: 'vehicleId', description: 'Vehicle ID' })
  @ApiQuery({
    name: 'groupId',
    required: false,
    description: 'Optionally filter to a specific document group ID',
  })
  @ApiResponse({ status: 200, type: [DocumentGroupResponseDto] })
  async listByVehicle(
    @Param('vehicleId') vehicleId: string,
    @Query('groupId') groupId?: string,
  ) {
    return this.service.listByVehicleId(vehicleId, groupId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a document group by ID' })
  @ApiResponse({ status: 200, type: DocumentGroupResponseDto })
  async findOne(@Param('id') id: string) {
    return this.service.repository.findUnique({ where: { id } });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a document group' })
  @ApiResponse({ status: 200, type: DocumentGroupResponseDto })
  async update(@Param('id') id: string, @Body() dto: UpdateDocumentGroupDto) {
    return this.service.repository.update({
      where: { id },
      data: {
        ...dto,
        description:
          dto.description === undefined ? undefined : (dto.description ?? null),
        type: dto.type === undefined ? undefined : (dto.type ?? null),
        parentId:
          dto.parentId === undefined ? undefined : (dto.parentId ?? null),
        groupName:
          dto.groupName === undefined ? undefined : (dto.groupName ?? null),
        order: dto.order === undefined ? undefined : (dto.order ?? null),
        isEnabled: dto.isEnabled,
      },
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document group' })
  async remove(@Param('id') id: string) {
    return this.service.repository.hardDelete({ where: { id } });
  }
}
