import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsUUID } from 'class-validator';

export enum VehicleDocumentStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    EXPIRED = 'EXPIRED',
}

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

    @ApiProperty({ enum: VehicleDocumentStatus })
    @IsNotEmpty()
    @IsEnum(VehicleDocumentStatus)
    status: VehicleDocumentStatus;
}

export class UpdateVehicleDocumentDto extends PartialType(CreateVehicleDocumentDto) { }

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

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
