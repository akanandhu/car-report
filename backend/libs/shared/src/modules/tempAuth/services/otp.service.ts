import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NotificationService } from '@shared/shared/common/notifications/engagespot/engagespot.service';
import { ExotelService } from '@shared/shared/common/notifications/exotel/exotel.service';
import { AppConfigService } from '@shared/shared/config';
import { UserRepository } from '@shared/shared/repositories';
// import { UserRoleRepository } from '@shared/shared/repositories/role.repository';
import * as speakeasy from 'speakeasy';

@Injectable()
export class OtpService {
  constructor(
    private readonly userRepository: UserRepository,
    // private readonly userRoleRepository: UserRoleRepository,
    private readonly notificationService: NotificationService,
    private readonly configService: AppConfigService,
    private readonly exotelService: ExotelService,
  ) { }

  /**
   * Generate OTP secret and token
   * @returns Object containing secret and token
   */
  private generateOtp(): { secret: string; token: string } {
    const secret = speakeasy.generateSecret({ length: 20 }).base32;
    const token = speakeasy.totp({
      secret,
      digits: 4,
      step: 300, // 5 minutes
    });
    return { secret, token };
  }

  /**
   * Verify OTP token against secret
   * @param secret OTP secret
   * @param token OTP token to verify
   * @returns True if token is valid
   */
  private verifyOtpToken(secret: string, token: string): boolean {
    return speakeasy.totp.verify({
      secret,
      token,
      digits: 4,
      step: 300, // 5 minutes
      window: 1, // Allow 1 step before/after for clock drift
    });
  }

  /**
   * Check if OTP is the staging bypass code
   * @param otp OTP code to check
   * @returns True if it's the bypass code and we're in staging
   */
  private isStagingBypassCode(otp: string): boolean {
    return this.configService.isStaging && otp === '2299';
  }

  /**
   * Send OTP to phone number
   * @param phoneNumber Phone number in international format
   * @returns True if OTP was sent successfully
   */
  async sendPhoneOtp(phoneNumber: string): Promise<boolean> {
    const user = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { secret, token } = this.generateOtp();
    console.log(`OTP for ${phoneNumber}: ${token}`);

    await this.userRepository.updateById(user.id, {
      otpSecret: secret,
    });

    // @debtbomb(expire=2026-01-30, owner=backend, reason='UnComment this on production)
    // this.exotelService.send(phoneNumber, `Use OTP ${token} to log into your Tukxi account. Do not share the OTP or your number with anyone including Tukxi personnel.`);

    return true;
  }

  /**
   * Verify OTP for phone number
   * @param phoneNumber Phone number in international format
   * @param otp OTP code
   * @returns True if OTP is valid
   */
  async verifyPhoneOtp(phoneNumber: string, otp: string): Promise<boolean> {
    const user = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (!user || !user.otpSecret) {
      throw new UnauthorizedException('Invalid verification attempt');
    }

    // Check for staging bypass code
    if (this.isStagingBypassCode(otp)) {
      await this.userRepository.updateById(user.id, {
        phoneVerifiedAt: new Date(),
      });
      return true;
    }

    const isValid = this.verifyOtpToken(user.otpSecret, otp);

    if (isValid) {
      await this.userRepository.updateById(user.id, {
        phoneVerifiedAt: new Date(),
      });
      return true;
    }

    return false;
  }

  /**
   * Send OTP to email address
   * @param email Email address
   * @returns True if OTP was sent successfully
   */
  async sendEmailOtp(email: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { secret, token } = this.generateOtp();
    console.log(`OTP for ${email}: ${token}`);

    await this.userRepository.updateById(user.id, {
      otpSecret: secret,
    });

    this.notificationService.sendNotification(
      this.configService.emailVerificationCodeWorkflow,
      [{ identifier: user.id, email }],
      { otp: token },
    );

    return true;
  }

  async sendForgotPasswordOtp(
    email: string,
    roleName: string,
  ): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found with this Email');
    }
    console.log(roleName);
    // // Check if user has super_admin role
    // const hasAdminRole = await this.userRoleRepository.userHasRole(
    //   user.id,
    //   roleName,
    // );
    // if (!hasAdminRole) {
    //   throw new NotFoundException('User not found with this Email');
    // }

    const { secret, token } = this.generateOtp();
    console.log(`OTP for ${email}: ${token}`);

    await this.userRepository.updateById(user.id, {
      otpSecret: secret,
    });

    this.notificationService.sendNotification(
      this.configService.forgotPasswordWorkflow,
      [{ identifier: user.id, email }],
      { otp: token },
    );

    return true;
  }

  /**
   * Verify OTP for email address
   * @param email Email address
   * @param otp OTP code
   * @returns True if OTP is valid
   */
  async verifyEmailOtp(email: string, otp: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.otpSecret) {
      throw new UnauthorizedException('Invalid verification attempt');
    }

    // Check for staging bypass code
    if (this.isStagingBypassCode(otp)) {
      await this.userRepository.updateById(user.id, {
        emailVerifiedAt: new Date(),
      });
      return true;
    }

    const isValid = this.verifyOtpToken(user.otpSecret, otp);

    if (isValid) {
      await this.userRepository.updateById(user.id, {
        emailVerifiedAt: new Date(),
      });
      return true;
    }

    return false;
  }

  /**
   * Verify OTP for forgot password (admin only)
   * @param email Email address
   * @param otp OTP code
   * @returns True if OTP is valid
   */
  async verifyForgotPasswordOtp(
    email: string,
    otp: string,
    roleName: string,
  ): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.otpSecret) {
      throw new UnauthorizedException('Invalid verification attempt');
    }
    console.log(roleName);
    // // Check if user has super_admin role
    // const hasGivenRole = await this.userRoleRepository.userHasRole(
    //   user.id,
    //   roleName,
    // );
    // if (!hasGivenRole) {
    //   throw new UnauthorizedException(
    //     `Only ${roleName} users can verify this forgot password OTP`,
    //   );
    // }

    // Check for staging bypass code
    if (this.isStagingBypassCode(otp)) {
      return true;
    }

    const isValid = this.verifyOtpToken(user.otpSecret, otp);
    return isValid;
  }
}
