import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

/**
 * DTO for creating a new vehicle
 */
export class CreateVehicleDto {
    @ApiProperty({
        description: 'Vehicle name',
        example: 'Toyota Camry 2023',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Vehicle registration/license plate number',
        example: 'ABC-1234',
    })
    @IsNotEmpty()
    @IsString()
    vehicleNumber: string;

    @ApiProperty({
        description: 'Vehicle status',
        example: 'active',
        enum: ['active', 'inactive', 'maintenance', 'retired'],
    })
    @IsNotEmpty()
    @IsString()
    status: string;

    @ApiProperty({
        description: 'Vehicle model',
        example: 'Camry XLE',
    })
    @IsNotEmpty()
    @IsString()
    model: string;

    @ApiPropertyOptional({
        description: 'ID of the user who created this vehicle',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsOptional()
    @IsUUID()
    createdBy?: string;
}

/**
 * DTO for updating vehicle information
 */
export class UpdateVehicleDto {
    @ApiPropertyOptional({
        description: 'Vehicle name',
        example: 'Toyota Camry 2024',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({
        description: 'Vehicle registration/license plate number',
        example: 'XYZ-5678',
    })
    @IsOptional()
    @IsString()
    vehicleNumber?: string;

    @ApiPropertyOptional({
        description: 'Vehicle status',
        example: 'maintenance',
        enum: ['active', 'inactive', 'maintenance', 'retired'],
    })
    @IsOptional()
    @IsString()
    status?: string;

    @ApiPropertyOptional({
        description: 'Vehicle model',
        example: 'Camry Hybrid',
    })
    @IsOptional()
    @IsString()
    model?: string;

    @ApiPropertyOptional({
        description: 'ID of the user who last modified this vehicle',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsOptional()
    @IsUUID()
    lastModifiedBy?: string;
}

/**
 * Vehicle response DTO
 */
export class VehicleResponseDto {
    @ApiProperty({
        description: 'Vehicle unique identifier',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;

    @ApiProperty({
        description: 'Vehicle name',
        example: 'Toyota Camry 2023',
    })
    name: string;

    @ApiProperty({
        description: 'Vehicle registration/license plate number',
        example: 'ABC-1234',
    })
    vehicleNumber: string;

    @ApiProperty({
        description: 'Vehicle status',
        example: 'active',
    })
    status: string;

    @ApiProperty({
        description: 'Vehicle model',
        example: 'Camry XLE',
    })
    model: string;

    @ApiPropertyOptional({
        description: 'ID of the user who created this vehicle',
        example: '123e4567-e89b-12d3-a456-426614174000',
        nullable: true,
    })
    createdBy: string | null;

    @ApiPropertyOptional({
        description: 'ID of the user who last modified this vehicle',
        example: '123e4567-e89b-12d3-a456-426614174000',
        nullable: true,
    })
    lastModifiedBy: string | null;

    @ApiProperty({
        description: 'Vehicle creation timestamp',
        example: '2024-01-14T10:30:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Vehicle last update timestamp',
        example: '2024-01-14T10:30:00.000Z',
    })
    updatedAt: Date;

    @ApiPropertyOptional({
        description: 'Vehicle deletion timestamp (soft delete)',
        example: '2024-01-14T10:30:00.000Z',
        nullable: true,
    })
    deletedAt: Date | null;
}
