import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token for obtaining new access tokens',
    example: '7c4c1c4e9a1d5f8e6a7d4f1c2a5e8f7a...',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken!: string;
}
