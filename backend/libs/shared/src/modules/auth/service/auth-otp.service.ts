import { Injectable } from '@nestjs/common';
import { UserRepository } from '@shared/modules/user/repository/user.repository';
import * as crypto from 'crypto';

@Injectable()
export class SharedAuthOtpService {
    private readonly OTP_EXPIRY_MINUTES = 10;

    constructor(private readonly userRepository: UserRepository) { }

    /**
     * Generate and send OTP to user's email
     */
    async generateAndSendOtp(email: string): Promise<string> {
        const otp = this.generateOtp();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + this.OTP_EXPIRY_MINUTES);

        // Store OTP in user record
        const user = await this.userRepository.findFirst({ where: { email } });
        if (user) {
            await this.userRepository.update({
                where: { id: user.id },
                data: {
                    otpSecret: otp,
                    otpExpiresAt: expiresAt,
                },
            });
        }

        // TODO: Implement actual email sending (use nodemailer, SendGrid, etc.)
        console.log(`[OTP] Generated OTP for ${email}: ${otp} (expires at ${expiresAt})`);

        return otp;
    }

    /**
     * Verify OTP for a user
     */
    async verifyOtp(email: string, otp: string): Promise<boolean> {
        const user = await this.userRepository.findFirst({ where: { email } });

        if (!user || !user.otpSecret || !user.otpExpiresAt) {
            return false;
        }

        const now = new Date();
        const isExpired = now > user.otpExpiresAt;

        if (isExpired) {
            // Clear expired OTP
            await this.userRepository.update({
                where: { id: user.id },
                data: {
                    otpSecret: null,
                    otpExpiresAt: null,
                },
            });
            return false;
        }

        const isValid = user.otpSecret === otp;

        if (isValid) {
            // Clear OTP after successful verification
            await this.userRepository.update({
                where: { id: user.id },
                data: {
                    otpSecret: null,
                    otpExpiresAt: null,
                },
            });
        }

        return isValid;
    }

    /**
     * Generate a 6-digit OTP
     */
    private generateOtp(): string {
        return crypto.randomInt(100000, 999999).toString();
    }
}
