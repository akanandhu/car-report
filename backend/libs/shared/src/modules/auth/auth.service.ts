import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../user/repository/user.repository';
import { SharedUserService } from '../user/user.service';
import { SharedAuthTokenService } from './service/auth-token.service';
import { SharedAuthOtpService } from './service/auth-otp.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SharedAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: SharedUserService,
    private readonly tokenService: SharedAuthTokenService,
    private readonly otpService: SharedAuthOtpService,
  ) { }

  /**
   * Register a new user
   */
  async register(data: {
    name: string;
    email: string;
    mobile: string;
    password: string;
  }) {
    return this.userService.register(data);
  }

  /**
   * Login with email and password
   */
  async login(email: string, password: string) {
    const user = await this.userRepository.findFirst({ where: { email } });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate tokens
    const tokens = await this.tokenService.generateTokens(user.id);

    return {
      ...tokens,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        emailVerifiedAt: user.emailVerifiedAt,
        mobileVerifiedAt: user.mobileVerifiedAt,
      },
    };
  }

  /**
   * Request password reset OTP
   */
  async forgotPassword(email: string) {
    const user = await this.userRepository.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.otpService.generateAndSendOtp(email);
    return { message: 'OTP sent to your email' };
  }

  /**
   * Verify OTP for password reset
   */
  async verifyResetOtp(email: string, otp: string) {
    const isValid = await this.otpService.verifyOtp(email, otp);
    if (!isValid) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    return { message: 'OTP verified successfully' };
  }

  /**
   * Reset password with OTP
   */
  async resetPassword(email: string, otp: string, newPassword: string) {
    // Verify OTP
    const isValid = await this.otpService.verifyOtp(email, otp);
    if (!isValid) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    const user = await this.userRepository.findFirst({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await this.userRepository.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return { message: 'Password reset successfully' };
  }

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string) {
    return this.tokenService.refreshAccessToken(refreshToken);
  }

  /**
   * Logout user
   */
  async logout(userId: string) {
    await this.tokenService.revokeUserTokens(userId);
    return { message: 'Logged out successfully' };
  }

  /**
   * Get current user info
   */
  async getCurrentUser(userId: string) {
    const user = await this.userRepository.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      emailVerifiedAt: user.emailVerifiedAt,
      mobileVerifiedAt: user.mobileVerifiedAt,
    };
  }
}
