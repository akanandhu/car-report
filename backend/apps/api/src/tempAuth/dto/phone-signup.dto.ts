import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class PhoneSignupDto {
  @ApiProperty({
    description: 'Phone number in international format (e.g., +919876543210)',
    example: '+919876543210',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber!: string;
}
