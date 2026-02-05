import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SharedVehicleService } from '@shared/modules/vehicle/vehicle.service';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
  VehicleResponseDto,
} from './dto/vehicle.dto';
import {
  ResponseDto,
  PaginationQueryDto,
  PaginatedResponseDto,
} from '../common/dto/response.dto';

@ApiTags('vehicles')
@Controller('vehicles')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class VehicleController {
  constructor(
    private readonly sharedVehicleService: SharedVehicleService,
  ) { }

  /**
   * Create a new vehicle
   */
  @Post()
  @ApiOperation({
    summary: 'Create a new vehicle',
    description: 'Register a new vehicle in the system',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Vehicle successfully created',
    type: VehicleResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Vehicle number already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async create(@Body() createDto: CreateVehicleDto): Promise<ResponseDto<VehicleResponseDto>> {
    const vehicle = await this.sharedVehicleService.create(createDto);

    return {
      data: vehicle as VehicleResponseDto,
      message: 'Vehicle created successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Update vehicle information
   */
  @Put(':id')
  @ApiOperation({
    summary: 'Update vehicle information',
    description: 'Update vehicle details such as name, status, model, or vehicle number',
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle successfully updated',
    type: VehicleResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vehicle not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Vehicle number already exists',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateVehicleDto,
  ): Promise<ResponseDto<VehicleResponseDto>> {
    const vehicle = await this.sharedVehicleService.update(id, updateDto);

    return {
      data: vehicle as VehicleResponseDto,
      message: 'Vehicle updated successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Get vehicle by ID
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get vehicle by ID',
    description: 'Retrieve a single vehicle by its unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle retrieved successfully',
    type: VehicleResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vehicle not found',
  })
  async findById(@Param('id') id: string): Promise<ResponseDto<VehicleResponseDto>> {
    const vehicle = await this.sharedVehicleService.findById(id);

    return {
      data: vehicle as VehicleResponseDto,
      message: 'Vehicle retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Get vehicle by ID with documents
   */
  @Get(':id/with-documents')
  @ApiOperation({
    summary: 'Get vehicle by ID with documents',
    description: 'Retrieve a single vehicle by its unique identifier along with its documents',
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vehicle not found',
  })
  async findWithDocuments(@Param('id') id: string) {
    const vehicle = await this.sharedVehicleService.findByIdWithDocuments(id);

    return {
      data: vehicle,
      message: 'Vehicle retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * List vehicles with pagination
   */
  @Get()
  @ApiOperation({
    summary: 'List vehicles with pagination',
    description: 'Retrieve a paginated list of vehicles with optional search',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
    example: 10,
  })
  @ApiQuery({
    name: 'search',
    required: false,
    type: String,
    description: 'Search term for name, vehicle number, model, or status',
    example: 'Toyota',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicles retrieved successfully',
    type: PaginatedResponseDto,
  })
  async list(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<VehicleResponseDto>> {
    const { page = 1, limit = 10, search } = paginationQuery;

    const result = await this.sharedVehicleService.list({
      page,
      limit,
      search,
    });

    return {
      data: result.data as VehicleResponseDto[],
      pagination: result.pagination,
      message: 'Vehicles retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Delete a vehicle (soft delete)
   */
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a vehicle',
    description: 'Soft delete a vehicle by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Vehicle ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Vehicle deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Vehicle not found',
  })
  async delete(@Param('id') id: string): Promise<ResponseDto<{ message: string }>> {
    const result = await this.sharedVehicleService.delete(id);

    return {
      data: result,
      message: 'Vehicle deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
