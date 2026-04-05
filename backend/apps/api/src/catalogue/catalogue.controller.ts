import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { CatalogueService } from './catalogue.service';

@ApiTags('catalogue')
@Controller('catalogue')
export class CatalogueController {
  constructor(private readonly catalogueService: CatalogueService) { }

  /**
   * Get all vehicle makes
   */
  @Get('makes')
  @ApiOperation({
    summary: 'Get vehicle makes',
    description:
      'Fetch list of vehicle makes from external catalogue API. Returns both raw results and formatted options for Select components.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle makes retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'Failed to fetch from external API',
  })
  async getMakes() {
    const data = await this.catalogueService.getMakes();

    return {
      data,
      message: 'Vehicle makes retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Get all configs
   */
  @Get('configs/:city_name')
  @ApiOperation({
    summary: 'Get configs',
    description:
      'Fetch list of configs from external catalogue API.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Configs retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: 'Failed to fetch from external API',
  })
  async getConfig(@Param('city_name') city_name: string) {
    const data = await this.catalogueService.getConfig(city_name);

    return {
      data,
      message: 'Configs retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Get formatted config options for a specific field (make_year, mileage, etc.)
   */
  @Get('config-options/:city_name')
  @ApiOperation({
    summary: 'Get config options for a field',
    description:
      'Returns formatted {label, value} options from the config API for a given field key.',
  })
  @ApiQuery({ name: 'field', required: true, description: 'Field key (make_year, mileage, no_of_owners, sell_time)' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Config options retrieved successfully' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Failed to fetch from external API' })
  async getConfigOptions(
    @Param('city_name') city_name: string,
    @Query('field') field: string,
  ) {
    const data = await this.catalogueService.getConfigOptions(city_name, field);

    return {
      data,
      message: 'Config options retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Get vehicle models for a given make and year
   */
  @Get('models')
  @ApiOperation({
    summary: 'Get vehicle models',
    description: 'Fetch vehicle models from external API by make_id and make_year.',
  })
  @ApiQuery({ name: 'make_id', required: true })
  @ApiQuery({ name: 'make_year', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Vehicle models retrieved successfully' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Failed to fetch from external API' })
  async getModels(
    @Query('make_id') make_id: string,
    @Query('make_year') make_year: string,
  ) {
    const data = await this.catalogueService.getModels(make_id, make_year);

    return {
      data,
      message: 'Vehicle models retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Get vehicle variants for a given model and year
   */
  @Get('variants')
  @ApiOperation({
    summary: 'Get vehicle variants',
    description: 'Fetch vehicle variants from external API by model_id and make_year.',
  })
  @ApiQuery({ name: 'model_id', required: true })
  @ApiQuery({ name: 'make_year', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Vehicle variants retrieved successfully' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Failed to fetch from external API' })
  async getVariants(
    @Query('model_id') model_id: string,
    @Query('make_year') make_year: string,
  ) {
    const data = await this.catalogueService.getVariants(model_id, make_year);

    return {
      data,
      message: 'Vehicle variants retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Get full vehicle variant data (including fuel_type, transmission_type)
   */
  @Get('variants-full')
  @ApiOperation({
    summary: 'Get full vehicle variant data',
    description: 'Fetch vehicle variants with fuel_type and transmission_type from external API.',
  })
  @ApiQuery({ name: 'model_id', required: true })
  @ApiQuery({ name: 'make_year', required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Vehicle variants retrieved successfully' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Failed to fetch from external API' })
  async getVariantsFull(
    @Query('model_id') model_id: string,
    @Query('make_year') make_year: string,
  ) {
    const data = await this.catalogueService.getVariantsFull(model_id, make_year);

    return {
      data,
      message: 'Vehicle variants retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Get full config data in a single call (all filter options)
   */
  @Get('configs-full/:city_name')
  @ApiOperation({
    summary: 'Get full config data',
    description: 'Fetch all config filter options in a single call, formatted as {label, value} arrays keyed by field name.',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Full config retrieved successfully' })
  @ApiResponse({ status: HttpStatus.BAD_GATEWAY, description: 'Failed to fetch from external API' })
  async getConfigFull(@Param('city_name') city_name: string) {
    const data = await this.catalogueService.getConfigFull(city_name);

    return {
      data,
      message: 'Full config retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
