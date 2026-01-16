import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
  Matches,
  Validate,
} from 'class-validator';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'PasswordsMatch', async: false })
export class PasswordsMatchConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return confirmPassword === relatedValue;
  }

  defaultMessage() {
    return 'Passwords do not match';
  }
}

export class ResetPasswordDto {
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

  @ApiProperty({
    description: 'New password (min 8 chars, 1 uppercase, 1 number)',
    example: 'NewPassword123',
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least 1 lowercase letter, 1 uppercase letter, and 1 number',
  })
  newPassword!: string;

  @ApiProperty({
    description: 'Confirm new password',
    example: 'NewPassword123',
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Validate(PasswordsMatchConstraint, ['newPassword'])
  confirmPassword!: string;
}
