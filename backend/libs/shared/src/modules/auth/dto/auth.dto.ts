import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthGoogleLoginDto {
  @ApiProperty({
    description: 'Google ID token',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjdkYzAyN...',
  })
  @IsNotEmpty()
  @IsString()
  idToken!: string;
}

export class AuthAppleLoginDto {
  @ApiProperty({
    description: 'Apple identity token',
    example: 'eyJraWQiOiJZdXlYb1kiLCJhbGciOiJSUzI1NiJ9...',
  })
  @IsNotEmpty()
  @IsString()
  identityToken!: string;
}

export class AuthAppleSignUpDto {
  @ApiProperty({
    description: 'Apple identity token',
    example: 'eyJraWQiOiJZdXlYb1kiLCJhbGciOiJSUzI1NiJ9...',
  })
  @IsNotEmpty()
  @IsString()
  identityToken!: string;
}
