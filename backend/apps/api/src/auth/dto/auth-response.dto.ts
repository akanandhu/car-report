import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;

    @ApiProperty()
    expiresIn: number;
}

export class AuthResponseDto {
    @ApiProperty()
    success: boolean;

    @ApiProperty()
    message: string;

    @ApiProperty({ required: false })
    data?: any;
}

export class UserResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    mobile: string;

    @ApiProperty({ required: false })
    emailVerifiedAt?: Date;

    @ApiProperty({ required: false })
    mobileVerifiedAt?: Date;
}
