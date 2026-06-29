import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RtoService } from './rto.service';
import { JwtAuthGuard } from '@shared/modules/auth/guards/jwt-auth.guard';

@ApiTags('rto')
@UseGuards(JwtAuthGuard)
@Controller()
export class RtoController {
  constructor(private readonly rtoService: RtoService) {}

  @Get('indian-states')
  @ApiOperation({
    summary: 'Get Indian states and union territories',
    description:
      'Returns official Indian state and union territory options for registration state selection.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Indian states retrieved successfully',
  })
  async getIndianStates() {
    return {
      data: await this.rtoService.getIndianStates(),
      message: 'Indian states retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }

  @Get('rtos')
  @ApiOperation({
    summary: 'Get RTOs by registration state',
    description:
      'Returns RTO options for the selected registration state code.',
  })
  @ApiQuery({ name: 'state', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'RTOs retrieved successfully',
  })
  async getRtos(@Query('state') state: string) {
    return {
      data: await this.rtoService.getRtosByState(state),
      message: 'RTOs retrieved successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
