import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  Query,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { SharedUserService } from '@shared/modules/user/user.service';
import {
  RegisterUserDto,
  UpdateUserDto,
  ChangePasswordDto,
  UserResponseDto,
} from './dto/user.dto';
import {
  ResponseDto,
  PaginationQueryDto,
  PaginatedResponseDto,
} from '../common/dto/response.dto';

@ApiTags('users')
@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class UserController {
  constructor(private readonly sharedUserService: SharedUserService) { }

  /**
   * Register a new user
   */
  @Post('register')
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Create a new user account with email, password, and other details',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User successfully registered',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  async register(@Body() registerDto: RegisterUserDto): Promise<ResponseDto<UserResponseDto>> {
    const user = await this.sharedUserService.register(registerDto);

    return {
      data: user as UserResponseDto,
      message: 'User registered successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  /**
   * Update user information
   */
  @Put(':id')
  @ApiOperation({
    summary: 'Update user information',
    description: 'Update user details such as name, email, or mobile',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully updated',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists',
  })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserDto,
  ): Promise<ResponseDto<UserResponseDto>> {
    const user = await this.sharedUserService.update(id, updateDto);

    return {
      data: user as UserResponseDto,
      message: 'User updated successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Change user password
   */
  @Put(':id/change-password')
  @ApiOperation({
    summary: 'Change user password',
    description: 'Change the password for an authenticated user',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password changed successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Current password is incorrect',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'New passwords do not match',
  })
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<ResponseDto<{ message: string }>> {
    const result = await this.sharedUserService.changePassword(
      id,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
      changePasswordDto.confirmPassword,
    );

    return {
      data: result,
      message: 'Password changed successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * Get user by ID
   */
  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a single user by their unique identifier',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User retrieved successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async findById(@Param('id') id: string): Promise<ResponseDto<UserResponseDto>> {
    const user = await this.sharedUserService.findById(id);

    return {
      data: user as UserResponseDto,
      message: 'User retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  /**
   * List users with pagination
   */
  @Get()
  @ApiOperation({
    summary: 'List users with pagination',
    description: 'Retrieve a paginated list of users with optional search',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users retrieved successfully',
    type: PaginatedResponseDto,
  })
  async list(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<UserResponseDto>> {
    const { page = 1, limit = 10, search } = paginationQuery;

    const result = await this.sharedUserService.list({
      page,
      limit,
      search,
    });

    return {
      data: result.data as UserResponseDto[],
      pagination: result.pagination,
      message: 'Users retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }
}

