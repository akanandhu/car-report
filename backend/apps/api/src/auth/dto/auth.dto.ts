import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'john@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '+1234567890' })
    @IsNotEmpty()
    @IsString()
    mobile: string;

    @ApiProperty({ example: 'Password@123' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/, {
        message: 'Password must contain uppercase, lowercase, number, and special character',
    })
    password: string;
}

export class LoginDto {
    @ApiProperty({ example: 'john@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'Password@123' })
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class RefreshTokenDto {
    @ApiProperty({ example: 'refresh_token_here' })
    @IsNotEmpty()
    @IsString()
    refreshToken: string;
}

export class ForgotPasswordDto {
    @ApiProperty({ example: 'john@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;
}

export class ResetPasswordDto {
    @ApiProperty({ example: 'john@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    @IsString()
    otp: string;

    @ApiProperty({ example: 'NewPassword@123' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/, {
        message: 'Password must contain uppercase, lowercase, number, and special character',
    })
    newPassword: string;
}

export class VerifyOtpDto {
    @ApiProperty({ example: 'john@example.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    @IsString()
    otp: string;
}
