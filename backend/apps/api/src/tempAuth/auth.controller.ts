import type { Request } from 'express';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Headers,
  BadRequestException,
  UseGuards,
  Req,
  Get,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiHeader } from '@nestjs/swagger';
import { AuthService } from '@shared/modules/tempAuth/auth.service';
import {
  PhoneSignupDto,
  PhoneVerificationDto,
  AuthResponseDto,
  OAuthLoginDto,
  RefreshTokenDto,
  EmailSignupDto,
  EmailVerificationDto,
  PasswordLoginDto,
  ForgotPasswordDto,
  VerifyForgotPasswordOtpDto,
  ResetPasswordDto,
} from './dto';
import { AuthRole } from '@shared/common/constants/constants';
import { JwtAuthGuard } from '@shared/modules/tempAuth/guards/jwt-auth.guard';
import { SharedUserService } from '@shared/modules/user/user.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: SharedUserService,
  ) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get authenticated user with profile and language',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Authenticated user',
    type: Object,
  })
  @ApiHeader({
    name: 'x-app-type',
    description: 'Application type (rider, driver,super_admin)',
    required: true,
    enum: [AuthRole.RIDER, AuthRole.DRIVER, AuthRole.SUPER_ADMIN],
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async me(@Req() req: Request, @Headers('x-app-type') appType: string) {
    const userId = (req.user as any)?.userId;
    if (!userId) throw new BadRequestException('userId not found in token');

    // Validate app type
    if (!appType || !Object.values(AuthRole).includes(appType as AuthRole)) {
      throw new BadRequestException('Invalid or missing x-app-type header');
    }

    const roleName = appType as AuthRole;
    const user = await this.userService.findUserWithProfileByIdAndRoleName(
      userId,
      roleName,
    );
    return {
      success: true,
      message: 'Authenticated driver user fetched',
      data: user,
      timestamp: Date.now(),
    };
  }

  @Post('phone/signup')
  @ApiOperation({ summary: 'Register with phone number' })
  @ApiHeader({
    name: 'x-app-type',
    description: 'Application type (rider, driver)',
    required: true,
    enum: [AuthRole.RIDER, AuthRole.DRIVER],
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully, OTP sent',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or missing/invalid x-app-type header',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  async phoneSignup(
    @Body() phoneSignupDto: PhoneSignupDto,
    @Headers('x-app-type') appType: string,
  ): Promise<AuthResponseDto> {
    // Validate app type
    if (!appType || !Object.values(AuthRole).includes(appType as AuthRole)) {
      throw new BadRequestException('Invalid or missing x-app-type header');
    }

    const phoneNumber = phoneSignupDto.phoneNumber.replace(/\s+/g, '');

    const role = appType as AuthRole;

    await this.authService.registerWithPhone(phoneNumber, role);

    return {
      success: true,
      message: 'OTP sent to your phone number',
      data: null,
    };
  }

  @Post('phone/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify phone number with OTP and login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Phone verified and logged in successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid OTP' })
  async phoneVerify(
    @Body() phoneVerificationDto: PhoneVerificationDto,
    @Headers('x-app-type') appType: string,
  ): Promise<AuthResponseDto> {
    const otp = phoneVerificationDto.otp;
    const phoneNumber = phoneVerificationDto.phoneNumber.replace(/\s+/g, '');

    // Validate app type
    if (!appType || !Object.values(AuthRole).includes(appType as AuthRole)) {
      throw new BadRequestException('Invalid or missing x-app-type header');
    }

    const tokens = await this.authService.loginWithPhone(
      phoneNumber,
      otp,
      appType,
    );

    return {
      success: true,
      message: 'Phone verified and logged in successfully',
      data: tokens,
    };
  }

  @Post('phone/resend-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend OTP to phone number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP resent successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async resendOtp(
    @Body() phoneSignupDto: PhoneSignupDto,
  ): Promise<AuthResponseDto> {
    await this.authService.sendOtp(phoneSignupDto.phoneNumber);

    return {
      success: true,
      message: 'OTP resent to your phone number',
      data: null,
    };
  }

  @Post('email/signup')
  @ApiOperation({ summary: 'Register with email address (riders only)' })
  @ApiHeader({
    name: 'x-app-type',
    description: 'Application type (rider only)',
    required: true,
    enum: [AuthRole.RIDER],
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully, OTP sent',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or missing/invalid x-app-type header',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists',
  })
  async emailSignup(
    @Body() emailSignupDto: EmailSignupDto,
    @Headers('x-app-type') appType: string,
  ): Promise<AuthResponseDto> {
    // Validate app type - only RIDER is allowed for email authentication
    if (!appType || appType !== AuthRole.RIDER) {
      throw new BadRequestException(
        'Invalid or missing x-app-type header. Email authentication is only available for riders.',
      );
    }
    console.log(`Received email signup request for app type: ${appType}`);

    const { email } = emailSignupDto;
    const role = appType as AuthRole;

    await this.authService.registerWithEmail(email, role);

    return {
      success: true,
      message: 'OTP sent to your email address',
      data: null,
    };
  }

  @Post('email/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify email address with OTP and login' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email verified and logged in successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid OTP' })
  async emailVerify(
    @Body() emailVerificationDto: EmailVerificationDto,
    @Headers('x-app-type') appType: string,
  ): Promise<AuthResponseDto> {
    const { email, otp } = emailVerificationDto;
    console.log(`Verifying email address: ${email} with OTP: ${otp}`);

    // Validate app type - only RIDER is allowed for email authentication
    if (!appType || appType !== AuthRole.RIDER) {
      throw new BadRequestException(
        'Invalid or missing x-app-type header. Email authentication is only available for riders.',
      );
    }

    const tokens = await this.authService.loginWithEmail(email, otp, appType);

    return {
      success: true,
      message: 'Email verified and logged in successfully',
      data: tokens,
    };
  }

  @Post('email/resend-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Resend OTP to email address' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP resent successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  async resendEmailOtp(
    @Body() emailSignupDto: EmailSignupDto,
  ): Promise<AuthResponseDto> {
    await this.authService.sendEmailOtp(emailSignupDto.email);

    return {
      success: true,
      message: 'OTP resent to your email address',
      data: null,
    };
  }

  @Post('oauth/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with OAuth provider (Google, Apple)' })
  @ApiHeader({
    name: 'x-app-type',
    description: 'Application type (rider, driver)',
    required: true,
    enum: [AuthRole.RIDER, AuthRole.DRIVER],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OAuth login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or missing/invalid x-app-type header',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid OAuth token',
  })
  async oauthLogin(
    @Body() oauthLoginDto: OAuthLoginDto,
    @Headers('x-app-type') appType: string,
  ): Promise<AuthResponseDto> {
    // Validate app type
    if (!appType || !Object.values(AuthRole).includes(appType as AuthRole)) {
      throw new BadRequestException('Invalid or missing x-app-type header');
    }

    const { provider, accessToken } = oauthLoginDto;
    const role = appType as AuthRole;

    const tokens = await this.authService.loginWithOAuth(
      provider,
      accessToken,
      role,
    );

    return {
      success: true,
      message: 'OAuth login successful',
      data: tokens,
    };
  }

  @Post('password/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiHeader({
    name: 'x-app-type',
    description: 'Application type (admin)',
    required: true,
    enum: [AuthRole.SUPER_ADMIN],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or missing/invalid x-app-type header',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid email or password',
  })
  async passwordLogin(
    @Body() passwordLoginDto: PasswordLoginDto,
    @Headers('x-app-type') appType: string,
  ): Promise<AuthResponseDto> {
    // Validate app type - only SUPER_ADMIN is allowed for password login
    if (!appType || appType !== AuthRole.SUPER_ADMIN) {
      throw new BadRequestException(
        'Invalid or missing x-app-type header. Password login is only available for super admin.',
      );
    }
    const role = appType as AuthRole;
    const { email, password } = passwordLoginDto;

    const tokens = await this.authService.loginWithPassword(
      email,
      password,
      role,
    );

    return {
      success: true,
      message: 'Login successful',
      data: tokens,
    };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send OTP for password reset' })
  @ApiHeader({
    name: 'x-app-type',
    description: 'Application type (admin)',
    required: true,
    enum: [AuthRole.SUPER_ADMIN],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP sent to email successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or missing/invalid x-app-type header',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
    @Headers('x-app-type') appType: string,
  ): Promise<AuthResponseDto> {
    // Validate app type - only SUPER_ADMIN is allowed for forgot password
    if (!appType || appType !== AuthRole.SUPER_ADMIN) {
      throw new BadRequestException(
        'Invalid or missing x-app-type header. Forgot password is only available for super admin.',
      );
    }

    const { email } = forgotPasswordDto;
    const role = appType as AuthRole;

    await this.authService.sendForgotPasswordOtp(email, role);

    return {
      success: true,
      message: 'OTP sent to your email address',
      data: null,
    };
  }

  @Post('verify-forgot-password-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify OTP for password reset' })
  @ApiHeader({
    name: 'x-app-type',
    description: 'Application type (admin)',
    required: true,
    enum: [AuthRole.SUPER_ADMIN],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP verified successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input or missing/invalid x-app-type header',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired OTP',
  })
  async verifyForgotPasswordOtp(
    @Body() verifyForgotPasswordOtpDto: VerifyForgotPasswordOtpDto,
    @Headers('x-app-type') appType: string,
  ): Promise<AuthResponseDto> {
    // Validate app type - only SUPER_ADMIN is allowed for forgot password OTP verification
    if (!appType || appType !== AuthRole.SUPER_ADMIN) {
      throw new BadRequestException(
        'Invalid or missing x-app-type header. Forgot password OTP verification is only available for super admin.',
      );
    }

    const { email, otp } = verifyForgotPasswordOtpDto;
    const role = appType as AuthRole;

    const isValid = await this.authService.verifyForgotPasswordOtp(
      email,
      otp,
      role,
    );

    if (!isValid) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    return {
      success: true,
      message: 'OTP verified successfully',
      data: null,
    };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with OTP' })
  @ApiHeader({
    name: 'x-app-type',
    description: 'Application type (admin)',
    required: true,
    enum: [AuthRole.SUPER_ADMIN],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Invalid input, passwords do not match, or missing/invalid x-app-type header',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired OTP',
  })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Headers('x-app-type') appType: string,
  ): Promise<AuthResponseDto> {
    const { email, otp, newPassword } = resetPasswordDto;
    const role = appType as AuthRole;
    await this.authService.resetPassword(email, otp, newPassword, role);

    return {
      success: true,
      message: 'Password reset successfully',
      data: null,
    };
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiHeader({
    name: 'x-app-type',
    description: 'Application type (admin)',
    required: true,
    enum: [AuthRole.SUPER_ADMIN],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token refreshed successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired refresh token',
  })
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Headers('x-app-type') appType: string,
  ): Promise<AuthResponseDto> {
    const { refreshToken } = refreshTokenDto;
    const role = appType as AuthRole;

    const tokens = await this.authService.refreshToken(refreshToken, role);

    return {
      success: true,
      message: 'Token refreshed successfully',
      data: tokens,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Logout user and revoke refresh tokens' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged out successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - invalid or missing token',
  })
  async logout(@Req() req: Request): Promise<AuthResponseDto> {
    const userId = (req.user as any)?.userId;
    if (!userId) {
      throw new BadRequestException('userId not found in token');
    }

    await this.authService.logout(userId);

    return {
      success: true,
      message: 'User logged out successfully',
      data: null,
    };
  }
}
