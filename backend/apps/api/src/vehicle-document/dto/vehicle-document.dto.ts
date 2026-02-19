import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export enum VehicleDocumentStatus {
    DRAFT = 'DRAFT',
    SUBMITTED = 'SUBMITTED',
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    EXPIRED = 'EXPIRED',
}

/**
 * DTO for saving step form data (creates or updates a draft)
 */
export class SaveStepDataDto {
    @ApiProperty({ description: 'Document group (step) ID' })
    @IsNotEmpty()
    @IsUUID()
    documentGroupId: string;

    @ApiProperty({
        description: 'Form data as key-value pairs matching field keys',
        example: { vehicle_name: 'Toyota Camry', vehicle_model: 'camry', vehicle_number: 'ABC-1234' },
    })
    @IsNotEmpty()
    @IsObject()
    documentSpec: Record<string, any>;

    @ApiPropertyOptional({ description: 'User ID who is submitting' })
    @IsOptional()
    @IsUUID()
    submittedBy?: string;
}

/**
 * DTO for creating a vehicle document directly (backwards compatible)
 */
export class CreateVehicleDocumentDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    documentGroupId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    vehicleId: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsObject()
    documentSpec?: any;

    @ApiPropertyOptional({ enum: VehicleDocumentStatus, default: VehicleDocumentStatus.DRAFT })
    @IsOptional()
    @IsEnum(VehicleDocumentStatus)
    status?: VehicleDocumentStatus;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    submittedBy?: string;
}

export class UpdateVehicleDocumentDto extends PartialType(CreateVehicleDocumentDto) { }

/**
 * DTO for final submission of all steps
 */
export class SubmitAllStepsDto {
    @ApiPropertyOptional({ description: 'User ID who is submitting' })
    @IsOptional()
    @IsUUID()
    submittedBy?: string;
}

export class VehicleDocumentResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    documentGroupId: string;

    @ApiProperty()
    vehicleId: string;

    @ApiPropertyOptional()
    documentSpec?: any;

    @ApiProperty({ enum: VehicleDocumentStatus })
    status: VehicleDocumentStatus;

    @ApiPropertyOptional()
    submittedBy?: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
