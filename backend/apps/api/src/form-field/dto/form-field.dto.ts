import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsBoolean,
    IsInt,
    IsUUID,
    IsArray,
    IsObject,
    IsIn,
    ValidateNested,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FIELD_TYPES } from '@shared/modules/form-field/interface/form-field.interface';

// ─── Create Field DTO ────────────────────────────────────────────────────────

export class CreateFormFieldDto {
    @ApiProperty({
        description: 'Document group (step) ID to attach this field to',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsUUID()
    documentGroupId: string;

    @ApiProperty({
        description: 'Field type',
        example: 'textfield',
        enum: [...FIELD_TYPES],
    })
    @IsNotEmpty()
    @IsString()
    @IsIn([...FIELD_TYPES])
    type: string;

    @ApiProperty({
        description: 'Display label for the field',
        example: 'Vehicle Name',
    })
    @IsNotEmpty()
    @IsString()
    label: string;

    @ApiProperty({
        description: 'Unique key identifier for the field within the step',
        example: 'vehicle_name',
    })
    @IsNotEmpty()
    @IsString()
    fieldKey: string;

    @ApiPropertyOptional({
        description: 'Placeholder text',
        example: 'Enter vehicle name',
    })
    @IsOptional()
    @IsString()
    placeholder?: string;

    @ApiPropertyOptional({
        description: 'Optional visual subgroup label used to group fields inside a step',
        example: 'Seller Info',
    })
    @IsOptional()
    @IsString()
    subgroup?: string;

    @ApiPropertyOptional({
        description: 'Default value for the field',
        example: '',
    })
    @IsOptional()
    @IsString()
    defaultValue?: string;

    @ApiPropertyOptional({
        description: 'Whether the field is required',
        example: true,
        default: false,
    })
    @IsOptional()
    @IsBoolean()
    isRequired?: boolean;

    @ApiPropertyOptional({
        description: 'Display order within the step',
        example: 1,
    })
    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;

    @ApiPropertyOptional({
        description: 'Validation rules object',
        example: { minLength: 2, maxLength: 100, pattern: '^[A-Z].*', patternMessage: 'Must start with uppercase' },
    })
    @IsOptional()
    @IsObject()
    validation?: Record<string, any>;

    @ApiPropertyOptional({
        description: 'Options array for select/radio/checkbox fields',
        example: [{ label: 'Maruthi', value: 'maruthi' }, { label: 'Toyota', value: 'toyota' }],
    })
    @IsOptional()
    @IsArray()
    options?: { label: string; value: string }[];

    @ApiPropertyOptional({
        description: 'API endpoint URL for paginated/dynamic options (used instead of options)',
        example: '/api/options/vehicle-models?page=1&limit=20',
    })
    @IsOptional()
    @IsString()
    endpoint?: string;

    @ApiPropertyOptional({
        description: 'Conditional display rules. Simple: { dependsOn, operator, value, action } or Complex: { logic, action, rules: [...] }',
        example: { dependsOn: 'vehicle_type', operator: 'equals', value: 'truck', action: 'show' },
    })
    @IsOptional()
    @IsObject()
    conditions?: Record<string, any>;

    @ApiPropertyOptional({
        description: 'Whether the field is enabled',
        default: true,
    })
    @IsOptional()
    @IsBoolean()
    isEnabled?: boolean;
}

// ─── Update Field DTO ────────────────────────────────────────────────────────

export class UpdateFormFieldDto {
    @ApiPropertyOptional({
        description: 'Field type',
        example: 'select',
        enum: [...FIELD_TYPES],
    })
    @IsOptional()
    @IsString()
    @IsIn([...FIELD_TYPES])
    type?: string;

    @ApiPropertyOptional({ description: 'Display label', example: 'Updated Label' })
    @IsOptional()
    @IsString()
    label?: string;

    @ApiPropertyOptional({ description: 'Unique field key', example: 'updated_key' })
    @IsOptional()
    @IsString()
    fieldKey?: string;

    @ApiPropertyOptional({ description: 'Placeholder text' })
    @IsOptional()
    @IsString()
    placeholder?: string;

    @ApiPropertyOptional({ description: 'Optional visual subgroup label' })
    @IsOptional()
    @IsString()
    subgroup?: string;

    @ApiPropertyOptional({ description: 'Default value' })
    @IsOptional()
    @IsString()
    defaultValue?: string;

    @ApiPropertyOptional({ description: 'Required flag' })
    @IsOptional()
    @IsBoolean()
    isRequired?: boolean;

    @ApiPropertyOptional({ description: 'Display order' })
    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;

    @ApiPropertyOptional({ description: 'Validation rules' })
    @IsOptional()
    @IsObject()
    validation?: Record<string, any>;

    @ApiPropertyOptional({ description: 'Options for select/radio/checkbox' })
    @IsOptional()
    @IsArray()
    options?: { label: string; value: string }[];

    @ApiPropertyOptional({ description: 'Endpoint URL for dynamic options' })
    @IsOptional()
    @IsString()
    endpoint?: string;

    @ApiPropertyOptional({ description: 'Conditional display rules' })
    @IsOptional()
    @IsObject()
    conditions?: Record<string, any>;

    @ApiPropertyOptional({ description: 'Whether the field is enabled' })
    @IsOptional()
    @IsBoolean()
    isEnabled?: boolean;
}

// ─── Reorder Fields DTO ──────────────────────────────────────────────────────

export class ReorderFieldItemDto {
    @ApiProperty({ description: 'Field ID' })
    @IsNotEmpty()
    @IsUUID()
    fieldId: string;

    @ApiProperty({ description: 'New order position', example: 1 })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    order: number;
}

export class ReorderFieldsDto {
    @ApiProperty({
        description: 'Document group (step) ID',
    })
    @IsNotEmpty()
    @IsUUID()
    documentGroupId: string;

    @ApiProperty({
        description: 'Array of field ID and order pairs',
        type: [ReorderFieldItemDto],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReorderFieldItemDto)
    fieldOrders: ReorderFieldItemDto[];
}

// ─── Response DTOs ───────────────────────────────────────────────────────────

export class FormFieldResponseDto {
    @ApiProperty() id: string;
    @ApiProperty() type: string;
    @ApiProperty() label: string;
    @ApiProperty() fieldKey: string;
    @ApiPropertyOptional() placeholder?: string;
    @ApiPropertyOptional() subgroup?: string;
    @ApiPropertyOptional() defaultValue?: string;
    @ApiProperty() isRequired: boolean;
    @ApiProperty() order: number;
    @ApiPropertyOptional() validation?: any;
    @ApiPropertyOptional() options?: any;
    @ApiPropertyOptional() endpoint?: string;
    @ApiPropertyOptional() conditions?: any;
    @ApiProperty() isEnabled: boolean;
    @ApiProperty() documentGroupId: string;
    @ApiProperty() createdAt: Date;
    @ApiProperty() updatedAt: Date;
}

export class StepInfoDto {
    @ApiProperty() stepId: string;
    @ApiProperty() stepNumber: number;
    @ApiProperty() stepName: string;
    @ApiPropertyOptional() stepDescription?: string;
}

export class FormConfigResponseDto {
    @ApiProperty() type: string;
    @ApiProperty() step: number;
    @ApiProperty() stepId: string;
    @ApiProperty() stepName: string;
    @ApiPropertyOptional() stepDescription?: string;
    @ApiProperty() totalSteps: number;
    @ApiProperty({ type: [FormFieldResponseDto] }) fields: FormFieldResponseDto[];
}

export class TypeStepsResponseDto {
    @ApiProperty() type: string;
    @ApiProperty() typeName: string;
    @ApiPropertyOptional() typeDescription?: string;
    @ApiProperty() totalSteps: number;
    @ApiProperty({ type: [StepInfoDto] }) steps: StepInfoDto[];
}
