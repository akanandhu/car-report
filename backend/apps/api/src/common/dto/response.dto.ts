import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsObject, IsOptional, IsPositive, IsString, Max, Min } from 'class-validator';

/**
 * Standard response DTO for all API responses
 */
export class ResponseDto<T = any> {
    @ApiProperty({ description: 'Response data' })
    @IsObject()
    data: T;

    @ApiProperty({ description: 'Response message', example: 'Success' })
    @IsString()
    message: string;

    @ApiProperty({ description: 'HTTP status code', example: 200 })
    @IsNumber()
    statusCode: number;
}

/**
 * Pagination query DTO for list endpoints
 */
export class PaginationQueryDto {
    @ApiPropertyOptional({
        description: 'Page number (1-based)',
        minimum: 1,
        default: 1,
        example: 1,
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Min(1)
    page?: number = 1;

    @ApiPropertyOptional({
        description: 'Number of items per page',
        minimum: 1,
        maximum: 100,
        default: 10,
        example: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Min(1)
    @Max(100)
    limit?: number = 10;

    @ApiPropertyOptional({
        description: 'Search term for filtering results',
        example: 'john',
    })
    @IsOptional()
    @IsString()
    search?: string;
}

/**
 * Pagination metadata DTO
 */
export class PaginationMetaDto {
    @ApiProperty({ description: 'Current page number', example: 1 })
    @IsNumber()
    currentPage: number;

    @ApiProperty({ description: 'Number of items per page', example: 10 })
    @IsNumber()
    perPage: number;

    @ApiProperty({ description: 'Total number of items', example: 100 })
    @IsNumber()
    total: number;

    @ApiProperty({ description: 'Total number of pages', example: 10 })
    @IsNumber()
    totalPages: number;

    @ApiProperty({ description: 'Whether there is a previous page', example: false })
    hasPreviousPage: boolean;

    @ApiProperty({ description: 'Whether there is a next page', example: true })
    hasNextPage: boolean;
}

/**
 * Paginated response DTO
 */
export class PaginatedResponseDto<T = any> {
    @ApiProperty({ description: 'Array of items', isArray: true })
    data: T[];

    @ApiProperty({ description: 'Pagination metadata', type: PaginationMetaDto })
    pagination: PaginationMetaDto;

    @ApiProperty({ description: 'Response message', example: 'Success' })
    @IsString()
    message: string;

    @ApiProperty({ description: 'HTTP status code', example: 200 })
    @IsNumber()
    statusCode: number;
}