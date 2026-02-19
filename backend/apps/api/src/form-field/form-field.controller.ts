import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SharedFormFieldService } from '@shared/modules/form-field/form-field.service';
import {
  CreateFormFieldDto,
  UpdateFormFieldDto,
  ReorderFieldsDto,
  FormConfigResponseDto,
  FormFieldResponseDto,
  TypeStepsResponseDto,
} from './dto/form-field.dto';
import { ResponseDto } from '../common/dto/response.dto';

@ApiTags('Form Configuration')
@Controller('form-config')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class FormFieldController {
  constructor(
    private readonly formFieldService: SharedFormFieldService,
  ) { }

  // ─── Get Form Config ────────────────────────────────────────────────────────

  /**
   * Get form fields for a specific type and step number
   */
  @Get(':type/:step')
  @ApiOperation({
    summary: 'Get form configuration for a type and step',
    description: 'Returns all enabled fields for the given form type and step number, ordered by display order',
  })
  @ApiParam({ name: 'type', description: 'Form type identifier (e.g., EVALUATION, FINANCE)', example: 'EVALUATION' })
  @ApiParam({ name: 'step', description: 'Step number (1-based)', example: '1' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Form configuration retrieved', type: FormConfigResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Type or step not found' })
  async getFormConfig(
    @Param('type') type: string,
    @Param('step') step: string,
  ): Promise<ResponseDto<FormConfigResponseDto>> {
    const config = await this.formFieldService.getFormConfig(type, parseInt(step, 10));

    return {
      data: config as FormConfigResponseDto,
      message: 'Form configuration retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Get all steps for a type (overview without field details)
   */
  @Get(':type/steps')
  @ApiOperation({
    summary: 'Get all steps for a form type',
    description: 'Returns an overview of all steps within a form type, without field details',
  })
  @ApiParam({ name: 'type', description: 'Form type identifier', example: 'EVALUATION' })
  @ApiResponse({ status: HttpStatus.OK, type: TypeStepsResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Type not found' })
  async getTypeSteps(
    @Param('type') type: string,
  ): Promise<ResponseDto<TypeStepsResponseDto>> {
    const steps = await this.formFieldService.getTypeSteps(type);

    return {
      data: steps as TypeStepsResponseDto,
      message: 'Type steps retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  // ─── Field Management ──────────────────────────────────────────────────────

  /**
   * Add a new field to a step
   */
  @Post('fields')
  @ApiOperation({
    summary: 'Add a new field to a step',
    description: 'Creates a new form field within a specific step (document group)',
  })
  @ApiResponse({ status: HttpStatus.CREATED, type: FormFieldResponseDto })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Field key already exists in this step' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid field type' })
  async addField(
    @Body() dto: CreateFormFieldDto,
  ): Promise<ResponseDto<FormFieldResponseDto>> {
    const field = await this.formFieldService.addField(dto);

    return {
      data: field as FormFieldResponseDto,
      message: 'Field added successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Update a field
   */
  @Put('fields/:id')
  @ApiOperation({
    summary: 'Update a form field',
    description: 'Update properties of an existing form field',
  })
  @ApiParam({ name: 'id', description: 'Field ID' })
  @ApiResponse({ status: HttpStatus.OK, type: FormFieldResponseDto })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Field not found' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Field key already exists' })
  async updateField(
    @Param('id') id: string,
    @Body() dto: UpdateFormFieldDto,
  ): Promise<ResponseDto<FormFieldResponseDto>> {
    const field = await this.formFieldService.updateField(id, dto);

    return {
      data: field as FormFieldResponseDto,
      message: 'Field updated successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Delete a field (soft delete)
   */
  @Delete('fields/:id')
  @ApiOperation({
    summary: 'Remove a form field',
    description: 'Soft delete a form field',
  })
  @ApiParam({ name: 'id', description: 'Field ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Field removed' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Field not found' })
  async removeField(
    @Param('id') id: string,
  ): Promise<ResponseDto<{ message: string }>> {
    const result = await this.formFieldService.removeField(id);

    return {
      data: result,
      message: 'Field removed successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Reorder fields within a step
   */
  @Put('fields/reorder')
  @ApiOperation({
    summary: 'Reorder fields within a step',
    description: 'Update the display order of multiple fields at once',
  })
  @ApiResponse({ status: HttpStatus.OK, type: [FormFieldResponseDto] })
  async reorderFields(
    @Body() dto: ReorderFieldsDto,
  ): Promise<ResponseDto<FormFieldResponseDto[]>> {
    const fields = await this.formFieldService.reorderFields(
      dto.documentGroupId,
      dto.fieldOrders,
    );

    return {
      data: fields as FormFieldResponseDto[],
      message: 'Fields reordered successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
