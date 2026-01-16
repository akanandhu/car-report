import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailSignupDto {
  @ApiProperty({
    description: 'Email address',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
