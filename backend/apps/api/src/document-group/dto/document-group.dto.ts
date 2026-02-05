import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateDocumentGroupDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    identifier: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    type?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsUUID()
    parentId?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    groupName?: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsInt()
    order?: number;

    @ApiPropertyOptional({ default: true })
    @IsOptional()
    @IsBoolean()
    isEnabled?: boolean;
}

export class UpdateDocumentGroupDto extends PartialType(CreateDocumentGroupDto) { }

export class DocumentGroupResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    identifier: string;

    @ApiPropertyOptional()
    description?: string;

    @ApiPropertyOptional()
    type?: string;

    @ApiPropertyOptional()
    parentId?: string;

    @ApiPropertyOptional()
    groupName?: string;

    @ApiPropertyOptional()
    order?: number;

    @ApiProperty()
    isEnabled: boolean;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
