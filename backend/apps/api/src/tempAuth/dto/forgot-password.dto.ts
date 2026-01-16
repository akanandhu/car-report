import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Admin email address',
    example: 'admin@tukxi.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
