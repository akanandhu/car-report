import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class EmailVerificationDto {
  @ApiProperty({
    description: 'Email address',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: '4-digit OTP code',
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  otp!: string;
}
