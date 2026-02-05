import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { SharedVehicleDocumentService } from '@shared/modules/vehicle-document/vehicle-document.service';
import { CreateVehicleDocumentDto, VehicleDocumentResponseDto } from './dto/vehicle-document.dto';

@ApiTags('Vehicle Documents')
@Controller('vehicle-documents')
export class VehicleDocumentController {
    constructor(private readonly service: SharedVehicleDocumentService) { }

    @Post()
    @ApiOperation({ summary: 'Create or Update a vehicle document' })
    @ApiResponse({ status: 201, type: VehicleDocumentResponseDto })
    async createOrUpdate(@Body() dto: CreateVehicleDocumentDto) {
        const existing = await this.service.repository.findFirst({
            where: {
                vehicleId: dto.vehicleId,
                documentGroupId: dto.documentGroupId,
            },
        });

        if (existing) {
            return this.service.repository.update({
                where: { id: existing.id },
                data: dto, // Updates all fields from dto
            });
        } else {
            return this.service.repository.create(dto);
        }
    }

    @Get()
    @ApiOperation({ summary: 'List vehicle documents by vehicle ID' })
    @ApiQuery({ name: 'vehicleId', required: true })
    @ApiResponse({ status: 200, type: [VehicleDocumentResponseDto] })
    async findAll(@Query('vehicleId') vehicleId: string) {
        return this.service.repository.findMany({
            where: { vehicleId },
            include: { documentGroup: true }, // Ideally include document group details
        });
    }
}
