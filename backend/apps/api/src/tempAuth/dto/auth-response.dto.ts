import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'Refresh token for obtaining new access tokens',
    example: '7c4c1c4e9a1d5f8e6a7d4f1c2a5e8f7a...',
  })
  refreshToken!: string;

  @ApiProperty({
    description: 'Token expiry time in seconds',
    example: 900,
  })
  expiresIn!: number;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'Success status',
    example: true,
  })
  success!: boolean;

  @ApiProperty({
    description: 'Authentication tokens',
    type: AuthTokensDto,
    nullable: true,
  })
  data?: AuthTokensDto | null;

  @ApiProperty({
    description: 'Message',
    example: 'Authentication successful',
  })
  message!: string;
}
