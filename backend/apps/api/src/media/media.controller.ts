import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SharedMediaService } from '@shared/modules/media/media.service';
import { ResponseDto } from '../common/dto/response.dto';
import {
  CreateSignedUploadDto,
  SignedUploadResponseDto,
} from './dto/media.dto';

@ApiTags('Media')
@Controller('media')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class MediaController {
  constructor(private readonly mediaService: SharedMediaService) {}

  @Post('signed-upload')
  @ApiOperation({ summary: 'Create a private Supabase signed upload URL' })
  @ApiResponse({ status: HttpStatus.CREATED, type: SignedUploadResponseDto })
  async createSignedUpload(
    @Body() dto: CreateSignedUploadDto,
  ): Promise<ResponseDto<SignedUploadResponseDto>> {
    const upload = await this.mediaService.createSignedUpload(dto);

    return {
      data: upload,
      message: 'Signed upload URL created successfully',
      statusCode: HttpStatus.CREATED,
    };
  }
}
