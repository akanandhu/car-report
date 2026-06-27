import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SharedMediaService } from '@shared/modules/media/media.service';
import { ResponseDto } from '../common/dto/response.dto';
import {
  CreateSignedReadsDto,
  CreateSignedUploadDto,
  DeleteMediaDto,
  SignedReadsResponseDto,
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

  @Post('signed-reads')
  @ApiOperation({ summary: 'Create private Supabase signed read URLs' })
  @ApiResponse({ status: HttpStatus.CREATED, type: SignedReadsResponseDto })
  async createSignedReads(
    @Body() dto: CreateSignedReadsDto,
  ): Promise<ResponseDto<SignedReadsResponseDto>> {
    const signedReads = await this.mediaService.createSignedReadUrls(dto.items);

    return {
      data: signedReads,
      message: 'Signed read URLs created successfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  @Delete()
  @ApiOperation({ summary: 'Delete private Supabase media object' })
  async deleteMedia(
    @Body() dto: DeleteMediaDto,
  ): Promise<ResponseDto<{ path: string }>> {
    const result = await this.mediaService.deleteObject(dto);

    return {
      data: result,
      message: 'Media deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
