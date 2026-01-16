import { ApiProperty } from '@nestjs/swagger';
import { AuthTokensDto } from './auth-response.dto';

export class AuthTokensWithProfileDto extends AuthTokensDto {
  @ApiProperty({
    description:
      'Indicates if the user has updated their profile for the current role',
    example: true,
  })
  isProfileUpdated!: boolean;

  @ApiProperty({
    description: 'Indicates if the user has verified their email',
    example: true,
  })
  emailVerified!: boolean;

  @ApiProperty({
    description: 'Indicates if the user has verified their phone',
    example: true,
  })
  phoneVerified!: boolean;

  @ApiProperty({
    description: 'Indicates if the user has accepted the terms and conditions',
    example: true,
  })
  isPolicyAllowed!: boolean;

  @ApiProperty({
    description: 'Indicates if the user phoneNumber',
  })
  phoneNumber!: string | null;

  @ApiProperty({
    description: 'Indicates the user email',
  })
  email!: string | null;

  @ApiProperty({
    description: 'Indicates the user ID',
  })
  userId!: string | null;

  @ApiProperty({
    description: 'Indicates the user profile ID',
  })
  userProfileId!: string | null;
}
