import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGoogleService } from './auth-google.service';
import { AppleAuthService } from './apple-auth.service';
import { AuthProvider } from '@shared/common/constants/constants';

export interface OAuthUserData {
  sub?: string;
  id?: string;
  email: string;
  name?: string;
  accessToken?: string;
  isPrivateEmail?: boolean;
  realUserStatus?: string;
}

@Injectable()
export class OAuthService {
  constructor(
    private readonly authGoogleService: AuthGoogleService,
    private readonly appleAuthService: AppleAuthService,
  ) {}
  /**
   * Verify OAuth token with provider
   * @param provider OAuth provider
   * @param accessToken OAuth access token
   * @returns User data from provider
   */
  async verifyOAuthToken(
    provider: AuthProvider,
    accessToken: string,
  ): Promise<OAuthUserData> {
    switch (provider) {
      case AuthProvider.GOOGLE:
        return this.verifyGoogleToken(accessToken);
      case AuthProvider.APPLE:
        return this.verifyAppleToken(accessToken);
      default:
        throw new UnauthorizedException(
          `Unsupported OAuth provider: ${provider}`,
        );
    }
  }

  /**
   * Verify Google OAuth token
   * @param accessToken Google ID token
   * @returns User data from Google
   */
  private async verifyGoogleToken(accessToken: string): Promise<OAuthUserData> {
    try {
      const profile = await this.authGoogleService.getProfileByToken({
        idToken: accessToken,
      });

      return {
        sub: profile.id,
        id: profile.id,
        email: profile.email,
        name: profile.name,
      };
    } catch (error) {
      console.error('Failed to verify Google token:', error);
      throw new UnauthorizedException('Failed to verify Google token');
    }
  }

  /**
   * Verify Apple OAuth token
   * @param accessToken Apple identity token
   * @returns User data from Apple
   */
  private async verifyAppleToken(accessToken: string): Promise<OAuthUserData> {
    try {
      const profile = await this.appleAuthService.getProfileByToken({
        identityToken: accessToken,
      });

      return {
        sub: profile.id,
        id: profile.id,
        email: profile.email,
        name: profile.name,
        isPrivateEmail: profile.isPrivateEmail || false,
        realUserStatus: profile.realUserStatus || 'unknown',
      };
    } catch (error) {
      throw new UnauthorizedException('Failed to verify Apple token');
    }
  }
}
