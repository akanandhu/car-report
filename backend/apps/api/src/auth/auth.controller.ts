import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SharedAuthService } from '@shared/modules/auth/auth.service';
import { JwtAuthGuard } from '@shared/modules/auth/guards/jwt-auth.guard';
import {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  VerifyOtpDto,
} from './dto/auth.dto';
import { AuthResponseDto, AuthTokensDto } from './dto/auth-response.dto';
import { Request } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: SharedAuthService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User registered successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email or mobile already exists',
  })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    const user = await this.authService.register(registerDto);

    return {
      success: true,
      message: 'User registered successfully',
      data: user,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Login successful',
    type: AuthTokensDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    const result = await this.authService.login(loginDto.email, loginDto.password);

    return {
      success: true,
      message: 'Login successful',
      data: result,
    };
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token using refresh token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token refreshed successfully',
    type: AuthTokensDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired refresh token',
  })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
    const tokens = await this.authService.refreshToken(refreshTokenDto.refreshToken);

    return {
      success: true,
      message: 'Token refreshed successfully',
      data: tokens,
    };
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset OTP' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP sent to email successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<AuthResponseDto> {
    const result = await this.authService.forgotPassword(forgotPasswordDto.email);

    return {
      success: true,
      message: result.message,
      data: null,
    };
  }

  @Post('verify-reset-otp')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify OTP for password reset' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'OTP verified successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired OTP',
  })
  async verifyResetOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<AuthResponseDto> {
    const result = await this.authService.verifyResetOtp(
      verifyOtpDto.email,
      verifyOtpDto.otp,
    );

    return {
      success: true,
      message: result.message,
      data: null,
    };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with OTP' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password reset successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid or expired OTP',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<AuthResponseDto> {
    const result = await this.authService.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.otp,
      resetPasswordDto.newPassword,
    );

    return {
      success: true,
      message: result.message,
      data: null,
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user and revoke refresh tokens' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logged out successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async logout(@Req() req: Request): Promise<AuthResponseDto> {
    const userId = (req.user as any)?.userId;
    const result = await this.authService.logout(userId);

    return {
      success: true,
      message: result.message,
      data: null,
    };
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User retrieved successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async getCurrentUser(@Req() req: Request): Promise<AuthResponseDto> {
    const userId = (req.user as any)?.userId;
    const user = await this.authService.getCurrentUser(userId);

    return {
      success: true,
      message: 'User retrieved successfully',
      data: user,
    };
  }
}
