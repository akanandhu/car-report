import {
    Body,
    Controller,
    Get,
    Post,
    Param,
    Query,
    HttpStatus,
    ValidationPipe,
    UsePipes,
    HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SharedVehicleDocumentService } from '@shared/modules/vehicle-document/vehicle-document.service';
import {
    CreateVehicleDocumentDto,
    SaveStepDataDto,
    SubmitAllStepsDto,
    VehicleDocumentResponseDto,
} from './dto/vehicle-document.dto';
import { ResponseDto } from '../common/dto/response.dto';

@ApiTags('Vehicle Documents')
@Controller('vehicle-documents')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class VehicleDocumentController {
    constructor(private readonly service: SharedVehicleDocumentService) { }

    // ─── Legacy Endpoint (backwards compatible) ──────────────────────────────

    @Post()
    @ApiOperation({ summary: 'Create or Update a vehicle document' })
    @ApiResponse({ status: 201, type: VehicleDocumentResponseDto })
    async createOrUpdate(@Body() dto: CreateVehicleDocumentDto) {

        try {
            const existing = await this.service.repository.findFirst({
                where: {
                    vehicleId: dto.vehicleId,
                    documentGroupId: dto.documentGroupId,
                    formFieldId: dto.formFieldId,
                },
            });

            if (existing) {
                return this.service.repository.update({
                    where: { id: existing.id },
                    data: dto,
                });
            } else {
                return this.service.repository.create({
                    ...dto,
                    status: dto.status || ('DRAFT' as any),
                    documentSpec: dto.documentSpec || null,
                    submittedBy: dto.submittedBy || null,
                    formFieldId: dto.formFieldId || null,
                });
            }
        } catch (error) {
            console.error('VehicleDocument createOrUpdate failed', error.stack);
            throw new HttpException(
                {
                    message: 'Something went wrong while saving vehicle document',
                    detail: error.message,
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get()
    @ApiOperation({ summary: 'List vehicle documents by vehicle ID' })
    @ApiQuery({ name: 'vehicleId', required: true })
    @ApiResponse({ status: 200, type: [VehicleDocumentResponseDto] })
    async findAll(@Query('vehicleId') vehicleId: string) {
        return this.service.repository.findMany({
            where: { vehicleId },
            include: { documentGroup: true },
        });
    }

    // ─── Step-by-Step Form Submission ────────────────────────────────────────

    /**
     * Save form data for a step (creates or updates as DRAFT)
     */
    @Post(':vehicleId/step-data')
    @ApiOperation({
        summary: 'Save step form data (DRAFT)',
        description: 'Save or update form data for a specific step. Data is merged with existing draft data. Creates a DRAFT document.',
    })
    @ApiParam({ name: 'vehicleId', description: 'Vehicle ID' })
    @ApiResponse({ status: HttpStatus.CREATED, type: VehicleDocumentResponseDto })
    async saveStepData(
        @Param('vehicleId') vehicleId: string,
        @Body() dto: SaveStepDataDto,
    ): Promise<ResponseDto<VehicleDocumentResponseDto>> {
        const document = await this.service.saveStepData(vehicleId, dto);

        return {
            data: document as VehicleDocumentResponseDto,
            message: 'Step data saved successfully',
            statusCode: HttpStatus.CREATED,
        };
    }

    /**
     * Get all form data for a vehicle (optionally filtered by type)
     */
    @Get(':vehicleId/form-data')
    @ApiOperation({
        summary: 'Get all form data for a vehicle',
        description: 'Retrieve all saved form data (drafts and submitted) for a vehicle, optionally filtered by form type',
    })
    @ApiParam({ name: 'vehicleId', description: 'Vehicle ID' })
    @ApiQuery({ name: 'type', required: false, description: 'Form type to filter by (e.g., EVALUATION, FINANCE)' })
    @ApiResponse({ status: HttpStatus.OK, type: [VehicleDocumentResponseDto] })
    async getVehicleFormData(
        @Param('vehicleId') vehicleId: string,
        @Query('type') type?: string,
    ): Promise<ResponseDto<VehicleDocumentResponseDto[]>> {
        const documents = await this.service.getVehicleFormData(vehicleId, type);

        return {
            data: documents as VehicleDocumentResponseDto[],
            message: 'Form data retrieved successfully',
            statusCode: HttpStatus.OK,
        };
    }

    /**
     * Get form data for a specific step
     */
    @Get(':vehicleId/step-data/:documentGroupId')
    @ApiOperation({
        summary: 'Get form data for a specific step',
        description: 'Retrieve saved form data for a specific step of a vehicle',
    })
    @ApiParam({ name: 'vehicleId', description: 'Vehicle ID' })
    @ApiParam({ name: 'documentGroupId', description: 'Document group (step) ID' })
    @ApiResponse({ status: HttpStatus.OK, type: VehicleDocumentResponseDto })
    async getStepData(
        @Param('vehicleId') vehicleId: string,
        @Param('documentGroupId') documentGroupId: string,
    ): Promise<ResponseDto<VehicleDocumentResponseDto | null>> {
        const document = await this.service.getStepData(vehicleId, documentGroupId);

        return {
            data: document as VehicleDocumentResponseDto | null,
            message: document ? 'Step data retrieved successfully' : 'No data found for this step',
            statusCode: HttpStatus.OK,
        };
    }

    /**
     * Submit all steps (DRAFT → SUBMITTED) for a vehicle and type
     */
    @Post(':vehicleId/submit/:type')
    @ApiOperation({
        summary: 'Submit all steps for a vehicle',
        description: 'Changes all DRAFT documents for the given type to SUBMITTED status',
    })
    @ApiParam({ name: 'vehicleId', description: 'Vehicle ID' })
    @ApiParam({ name: 'type', description: 'Form type (e.g., EVALUATION, FINANCE)' })
    @ApiResponse({ status: HttpStatus.OK })
    async submitAllSteps(
        @Param('vehicleId') vehicleId: string,
        @Param('type') type: string,
        @Body() dto: SubmitAllStepsDto,
    ): Promise<ResponseDto<{ message: string; submittedCount: number; totalSteps: number }>> {
        const result = await this.service.submitAllSteps(vehicleId, type, dto.submittedBy);

        return {
            data: result,
            message: result.message,
            statusCode: HttpStatus.OK,
        };
    }
}
