import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, Length } from 'class-validator';

export class PhoneVerificationDto {
  @ApiProperty({
    description: 'Phone number in international format',
    example: '+919876543210',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber!: string;

  @ApiProperty({
    description: '4-digit OTP code',
    example: '1234',
  })
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  otp!: string;
}
