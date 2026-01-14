import { ApiProperty, ApiPropertyOptional, OmitType, PartialType } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Matches,
    MinLength,
} from 'class-validator';

/**
 * DTO for user registration
 */
export class RegisterUserDto {
    @ApiProperty({
        description: 'User full name',
        example: 'John Doe',
        minLength: 2,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name: string;

    @ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User mobile number',
        example: '+1234567890',
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, {
        message: 'Mobile number must be valid',
    })
    mobile: string;

    @ApiProperty({
        description: 'User password (min 8 characters, must contain uppercase, lowercase, number, and special character)',
        example: 'Password@123',
        minLength: 8,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/, {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    password: string;

    @ApiPropertyOptional({
        description: 'Client ID (reference to parent user)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsOptional()
    @IsUUID()
    clientId?: string;
}

/**
 * DTO for updating user information
 */
export class UpdateUserDto {
    @ApiPropertyOptional({
        description: 'User full name',
        example: 'John Doe Updated',
        minLength: 2,
    })
    @IsOptional()
    @IsString()
    @MinLength(2)
    name?: string;

    @ApiPropertyOptional({
        description: 'User email address',
        example: 'john.updated@example.com',
    })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiPropertyOptional({
        description: 'User mobile number',
        example: '+1234567890',
    })
    @IsOptional()
    @IsString()
    @Matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/, {
        message: 'Mobile number must be valid',
    })
    mobile?: string;

    @ApiPropertyOptional({
        description: 'Client ID (reference to parent user)',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsOptional()
    @IsUUID()
    clientId?: string;
}

/**
 * DTO for changing user password
 */
export class ChangePasswordDto {
    @ApiProperty({
        description: 'Current password',
        example: 'OldPassword@123',
    })
    @IsNotEmpty()
    @IsString()
    currentPassword: string;

    @ApiProperty({
        description: 'New password (min 8 characters, must contain uppercase, lowercase, number, and special character)',
        example: 'NewPassword@123',
        minLength: 8,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]/, {
        message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
    })
    newPassword: string;

    @ApiProperty({
        description: 'Confirmation of new password',
        example: 'NewPassword@123',
    })
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
}

/**
 * User response DTO (excludes password)
 */
export class UserResponseDto {
    @ApiProperty({
        description: 'User unique identifier',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe',
    })
    name: string;

    @ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com',
    })
    email: string;

    @ApiProperty({
        description: 'User mobile number',
        example: '+1234567890',
    })
    mobile: string;

    @ApiPropertyOptional({
        description: 'Client ID (reference to parent user)',
        example: '123e4567-e89b-12d3-a456-426614174000',
        nullable: true,
    })
    clientId: string | null;

    @ApiPropertyOptional({
        description: 'Mobile verification timestamp',
        example: '2024-01-14T10:30:00.000Z',
        nullable: true,
    })
    mobileVerifiedAt: Date | null;

    @ApiPropertyOptional({
        description: 'Email verification timestamp',
        example: '2024-01-14T10:30:00.000Z',
        nullable: true,
    })
    emailVerifiedAt: Date | null;

    @ApiProperty({
        description: 'Account creation timestamp',
        example: '2024-01-14T10:30:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Account last update timestamp',
        example: '2024-01-14T10:30:00.000Z',
    })
    updatedAt: Date;

    @ApiPropertyOptional({
        description: 'Account deletion timestamp (soft delete)',
        example: '2024-01-14T10:30:00.000Z',
        nullable: true,
    })
    deletedAt: Date | null;
}

