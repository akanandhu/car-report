import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyForgotPasswordOtpDto {
  @ApiProperty({
    description: 'Admin email address',
    example: 'admin@tukxi.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'OTP code received via email',
    example: '1234',
    minLength: 4,
    maxLength: 4,
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  otp!: string;
}
