import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { AuthProvider } from '@shared/common/constants/constants';

export class OAuthLoginDto {
  @ApiProperty({
    description: 'OAuth provider',
    enum: AuthProvider,
    example: AuthProvider.GOOGLE,
  })
  @IsNotEmpty()
  @IsEnum(AuthProvider)
  provider!: AuthProvider;

  @ApiProperty({
    description: 'OAuth access token from the provider',
    example: 'ya29.a0AfB_byDZMlZLrLQHxrAZUJZeI...',
  })
  @IsNotEmpty()
  @IsString()
  accessToken!: string;
}
