import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AppConfigService } from '@shared/config';
import SignInWithAppleResponse from 'apple-signin-auth';

export interface AppleUserProfile {
  id: string;
  email: string;
  name: string;
  isPrivateEmail?: boolean;
  realUserStatus?: string;
}

export interface AuthAppleLoginDto {
  identityToken: string;
}

@Injectable()
export class AppleAuthService {
  constructor(private readonly appConfigService: AppConfigService) {}
  async getProfileByToken(
    loginDto: AuthAppleLoginDto,
  ): Promise<AppleUserProfile> {
    try {
      const response = await SignInWithAppleResponse.verifyIdToken(
        loginDto.identityToken,
        {
          audience: this.appConfigService.appleBundleId,
        },
      );

      if (!response) {
        throw new UnauthorizedException('Invalid Apple token payload.');
      }

      const name = response.email?.split('@')[0] || '';

      // Check if this is a masked/private email from Apple
      const isPrivateEmail =
        response.email?.includes('@privaterelay.appleid.com') || false;

      return {
        id: response.sub,
        email: response.email || '',
        name,
        isPrivateEmail,
        realUserStatus: (response as any).real_user_status || 'unknown',
      };
    } catch (error) {
      this.handleError(error, 'Failed to verify Apple token');
    }
  }

  private handleError(error: unknown, fallbackMessage: string): never {
    if (error instanceof HttpException) {
      throw error;
    }

    if (error instanceof Error) {
      throw new UnauthorizedException(error.message || fallbackMessage);
    }

    throw new UnauthorizedException(fallbackMessage);
  }
}
