import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PasswordLoginDto {
  @ApiProperty({
    description: 'Admin email address',
    example: 'admin@tukxi.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Admin password',
    example: 'tukxi@2025',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;
}
