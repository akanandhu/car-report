import { Injectable, Logger } from '@nestjs/common';
import { AuthCredentialRepository } from '@shared/repositories/auth-credential.repository';
import { UserRepository } from '@shared/repositories/user.repository';
import { AuthProvider } from '@shared/common/constants/constants';

@Injectable()
export class AppleEmailManagerService {
  private readonly logger = new Logger(AppleEmailManagerService.name);

  constructor(
    private readonly authCredentialRepository: AuthCredentialRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Check if an email is an Apple private relay email
   */
  isApplePrivateEmail(email: string): boolean {
    return email.includes('@privaterelay.appleid.com');
  }

  /**
   * Find user by Apple provider ID, handling potential email changes
   */
  async findUserByAppleId(appleId: string): Promise<any> {
    const credential =
      await this.authCredentialRepository.findByTypeAndIdentifier(
        AuthProvider.APPLE,
        appleId,
        { include: { user: true } },
      );

    return credential?.user || null;
  }

  /**
   * Handle Apple email updates and track email history
   */
  async handleAppleEmailUpdate(
    userId: string,
    credentialId: string,
    newEmail: string,
    currentMetadata: any,
  ): Promise<void> {
    const currentEmail = currentMetadata?.currentEmail;

    if (currentEmail === newEmail) {
      return; // No change needed
    }

    this.logger.log(
      `Updating Apple email for user ${userId}: ${currentEmail} -> ${newEmail}`,
    );

    // Update user's primary email
    await this.userRepository.updateUserEmail(userId, newEmail);

    // Update credential metadata with email history
    const emailHistory = currentMetadata?.emailHistory || [];
    if (currentEmail && !emailHistory.includes(currentEmail)) {
      emailHistory.push(currentEmail);
    }
    if (!emailHistory.includes(newEmail)) {
      emailHistory.push(newEmail);
    }

    await this.authCredentialRepository.updateMetadata(credentialId, {
      ...currentMetadata,
      currentEmail: newEmail,
      emailHistory,
      lastEmailUpdate: new Date().toISOString(),
      isPrivateEmail: this.isApplePrivateEmail(newEmail),
    });
  }

  /**
   * Get all email addresses associated with an Apple user
   */
  async getAppleUserEmailHistory(userId: string): Promise<string[]> {
    const credential = await this.authCredentialRepository.findByUserAndType(
      userId,
      AuthProvider.APPLE,
    );

    if (!credential?.metadata?.emailHistory) {
      return [];
    }

    return credential.metadata.emailHistory;
  }

  /**
   * Check if a user has Apple Sign-In linked
   */
  async hasAppleSignIn(userId: string): Promise<boolean> {
    const credential = await this.authCredentialRepository.findByUserAndType(
      userId,
      AuthProvider.APPLE,
    );

    return !!credential;
  }

  /**
   * Get Apple credential metadata for a user
   */
  async getAppleMetadata(userId: string): Promise<any> {
    const credential = await this.authCredentialRepository.findByUserAndType(
      userId,
      AuthProvider.APPLE,
    );

    return credential?.metadata || null;
  }

  /**
   * Validate Apple email transition (for security)
   */
  async validateAppleEmailTransition(
    oldEmail: string,
    newEmail: string,
    appleId: string,
  ): Promise<boolean> {
    // Both emails should be from Apple if they're private
    const oldIsApple = this.isApplePrivateEmail(oldEmail);
    const newIsApple = this.isApplePrivateEmail(newEmail);

    // If transitioning from Apple private email to regular email, log for review
    if (oldIsApple && !newIsApple) {
      this.logger.warn(
        `Apple user ${appleId} transitioning from private email ${oldEmail} to regular email ${newEmail}`,
      );
    }

    // If transitioning from regular email to Apple private email, this is normal
    if (!oldIsApple && newIsApple) {
      this.logger.log(
        `Apple user ${appleId} transitioning from regular email ${oldEmail} to private email ${newEmail}`,
      );
    }

    return true; // Allow all transitions for now, but log them
  }

  /**
   * Clean up old Apple email references (for privacy compliance)
   */
  async cleanupOldAppleEmails(
    userId: string,
    keepRecentCount: number = 3,
  ): Promise<void> {
    const credential = await this.authCredentialRepository.findByUserAndType(
      userId,
      AuthProvider.APPLE,
    );

    if (!credential?.metadata?.emailHistory) {
      return;
    }

    const emailHistory = credential.metadata.emailHistory;
    if (emailHistory.length <= keepRecentCount) {
      return;
    }

    // Keep only the most recent emails
    const recentEmails = emailHistory.slice(-keepRecentCount);

    this.logger.log(
      `Cleaning up old Apple emails for user ${userId}, keeping ${keepRecentCount} most recent`,
    );

    await this.authCredentialRepository.updateMetadata(credential.id, {
      ...credential.metadata,
      emailHistory: recentEmails,
      lastCleanup: new Date().toISOString(),
    });
  }
}
