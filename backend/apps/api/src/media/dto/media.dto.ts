import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsMimeType,
  IsNotEmpty,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateSignedUploadDto {
  @ApiProperty({ description: 'Vehicle ID' })
  @IsNotEmpty()
  @IsUUID()
  vehicleId: string;

  @ApiProperty({
    description: 'Document group ID for the current evaluation step',
  })
  @IsNotEmpty()
  @IsUUID()
  documentGroupId: string;

  @ApiProperty({ description: 'File field key within the document group' })
  @IsNotEmpty()
  @IsString()
  fieldKey: string;

  @ApiProperty({
    description: 'Original file name',
    example: 'front-bumper.jpg',
  })
  @IsNotEmpty()
  @IsString()
  fileName: string;

  @ApiProperty({
    description: 'Browser detected MIME type',
    example: 'image/jpeg',
  })
  @IsNotEmpty()
  @IsMimeType()
  mimeType: string;

  @ApiProperty({ description: 'File size in bytes', example: 423112 })
  @IsInt()
  @Min(1)
  size: number;
}

export class SignedUploadResponseDto {
  @ApiProperty()
  bucket: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  signedUrl: string;

  @ApiProperty({ required: false })
  token?: string;

  @ApiProperty({ enum: ['image', 'video', 'file'] })
  type: 'image' | 'video' | 'file';

  @ApiProperty()
  mimeType: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  originalName: string;

  @ApiProperty()
  maxSize: number;
}
