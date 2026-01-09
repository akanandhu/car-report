import { Injectable } from '@nestjs/common';
import { User } from '../../repositories/models/user.model';
import { AuthTokensWithProfileDto } from 'apps/api/src/v1/auth/dto/auth-tokens-with-profile.dto';
import { OtpService } from './services/otp.service';
import { AuthenticationService } from './services/authentication.service';
import { UserRegistrationService } from './services/user-registration.service';
import {
  AuthProvider,
  AuthRole,
} from '@shared/shared/common/constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly otpService: OtpService,
    private readonly authenticationService: AuthenticationService,
    private readonly userRegistrationService: UserRegistrationService,
  ) {}

  /**
   * Register a new user with phone number
   * @param phoneNumber Phone number in international format
   * @param role User role (rider, driver, etc.)
   * @returns Created or existing user
   */
  async registerWithPhone(phoneNumber: string, role: AuthRole): Promise<User> {
    const user = await this.userRegistrationService.registerWithPhone(
      phoneNumber,
      role,
    );
    await this.sendOtp(phoneNumber);
    return user;
  }

  /**
   * Send OTP to phone number
   * @param phoneNumber Phone number in international format
   * @returns True if OTP was sent successfully
   */
  async sendOtp(phoneNumber: string): Promise<boolean> {
    return this.otpService.sendPhoneOtp(phoneNumber);
  }

  /**
   * Verify OTP for phone number
   * @param phoneNumber Phone number in international format
   * @param otp OTP code
   * @returns True if OTP is valid
   */
  async verifyOtp(phoneNumber: string, otp: string): Promise<boolean> {
    return this.otpService.verifyPhoneOtp(phoneNumber, otp);
  }

  /**
   * Login with phone number and OTP
   * @param phoneNumber Phone number in international format
   * @param otp OTP code
   * @returns Auth tokens
   */
  async loginWithPhone(
    phoneNumber: string,
    otp: string,
    roleName?: string,
  ): Promise<AuthTokensWithProfileDto> {
    return this.authenticationService.loginWithPhone(
      phoneNumber,
      otp,
      roleName,
    );
  }

  /**
   * Register a new user with email address (riders only)
   * @param email Email address
   * @param role User role (must be RIDER)
   * @returns Created or existing user
   */
  async registerWithEmail(email: string, role: AuthRole): Promise<User> {
    const user = await this.userRegistrationService.registerWithEmail(
      email,
      role,
    );
    await this.sendEmailOtp(email);
    return user;
  }

  /**
   * Send OTP to email address
   * @param email Email address
   * @returns True if OTP was sent successfully
   */
  async sendEmailOtp(email: string): Promise<boolean> {
    return this.otpService.sendEmailOtp(email);
  }

  /**
   * Verify OTP for email address
   * @param email Email address
   * @param otp OTP code
   * @returns True if OTP is valid
   */
  async verifyEmailOtp(email: string, otp: string): Promise<boolean> {
    return this.otpService.verifyEmailOtp(email, otp);
  }

  /**
   * Login with email address and OTP
   * @param email Email address
   * @param otp OTP code
   * @param roleName Role name
   * @returns Auth tokens
   */
  async loginWithEmail(
    email: string,
    otp: string,
    roleName?: string,
  ): Promise<AuthTokensWithProfileDto> {
    return this.authenticationService.loginWithEmail(email, otp, roleName);
  }

  /**
   * Login with OAuth provider
   * @param provider OAuth provider (google, apple)
   * @param accessToken OAuth access token
   * @param role Role for the user
   * @returns Auth tokens
   */
  async loginWithOAuth(
    provider: AuthProvider,
    accessToken: string,
    role?: AuthRole,
  ): Promise<AuthTokensWithProfileDto> {
    return this.authenticationService.loginWithOAuth(
      provider,
      accessToken,
      role,
    );
  }

  /**
   * Login with email and password (for admin users)
   * @param email Email address
   * @param password Password
   * @returns Auth tokens
   */
  async loginWithPassword(
    email: string,
    password: string,
    roleName: string,
  ): Promise<AuthTokensWithProfileDto> {
    return this.authenticationService.loginWithPassword(
      email,
      password,
      roleName,
    );
  }

  /**
   * Create admin user with password (for seeding)
   * @param email Email address
   * @param password Password
   * @param role Role for the user
   * @returns Created user
   */
  async createAdminWithPassword(
    email: string,
    password: string,
    role: AuthRole,
  ): Promise<User> {
    return this.userRegistrationService.createAdminWithPassword(
      email,
      password,
      role,
    );
  }

  /**
   * Send OTP for forgot password
   * @param email Email address
   * @returns True if OTP was sent successfully
   */
  async sendForgotPasswordOtp(
    email: string,
    roleName: string,
  ): Promise<boolean> {
    return this.otpService.sendForgotPasswordOtp(email, roleName);
  }

  /**
   * Verify OTP for forgot password
   * @param email Email address
   * @param otp OTP code
   * @returns True if OTP is valid
   */
  async verifyForgotPasswordOtp(
    email: string,
    otp: string,
    roleName: string,
  ): Promise<boolean> {
    return this.otpService.verifyForgotPasswordOtp(email, otp, roleName);
  }

  /**
   * Reset password using OTP
   * @param email Email address
   * @param otp OTP code
   * @param newPassword New password
   * @returns True if password was reset successfully
   */
  async resetPassword(
    email: string,
    otp: string,
    newPassword: string,
    roleName: string,
  ): Promise<boolean> {
    return this.authenticationService.resetPassword(
      email,
      otp,
      newPassword,
      roleName,
    );
  }

  /**
   * Refresh access token using refresh token
   * @param refreshToken Refresh token
   * @returns New access token, refresh token, and expiry
   */
  async refreshToken(
    refreshToken: string,
    role: string,
  ): Promise<AuthTokensWithProfileDto> {
    return this.authenticationService.refreshToken(refreshToken, role);
  }

  /**
   * Logout user by revoking all refresh tokens
   * @param userId User ID to logout
   * @returns True if logout was successful
   */
  async logout(userId: string): Promise<boolean> {
    return this.authenticationService.logout(userId);
  }
}
