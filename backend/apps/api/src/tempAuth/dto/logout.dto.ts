import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class LogoutDto {
  @ApiProperty({
    description:
      'Refresh token to revoke (optional - if not provided, all tokens will be revoked)',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    required: false,
  })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
