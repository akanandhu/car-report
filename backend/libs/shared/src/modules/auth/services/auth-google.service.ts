import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AppConfigService } from '@shared/config';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

export interface GoogleUserProfile {
  id: string;
  email: string;
  name: string;
}

export interface AuthGoogleLoginDto {
  idToken: string;
}

@Injectable()
export class AuthGoogleService {
  private googleClient: OAuth2Client;

  constructor(private readonly appConfigService: AppConfigService) {
    this.googleClient = new OAuth2Client(
      this.appConfigService.googleClientId,
      this.appConfigService.googleClientSecret,
    );
  }

  /**
   * Verifies the ID token and retrieves the user's profile information.
   *
   * @param loginDto - DTO containing the ID token.
   * @returns Promise<GoogleUserProfile> - The user's profile information.
   */
  async getProfileByToken(
    loginDto: AuthGoogleLoginDto,
  ): Promise<GoogleUserProfile> {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken: loginDto.idToken,
        audience: [
          this.appConfigService.googleClientId,
          this.appConfigService.googleClientIdIos,
        ],
      });

      const payload: TokenPayload | undefined = ticket.getPayload();

      if (!payload) {
        throw new HttpException(
          'Invalid Google token payload.',
          HttpStatus.UNAUTHORIZED,
        );
      }

      return {
        id: payload.sub,
        email: payload.email || '',
        name: payload.name || '',
      };
    } catch (error: any) {
      throw new HttpException(
        `Failed to verify Google token: ${error.message}`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
