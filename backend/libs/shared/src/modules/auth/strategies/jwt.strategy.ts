import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AppConfigService } from '@shared/shared/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiConsumer } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.jwtSecret,
    });
  }

  async validate(payload: any) {
    if (!payload.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    const res: ApiConsumer = {
      userId: payload.sub,
      roles: payload.roles || [],
      permissions: payload.permissions || [],
      profileId: payload.profileId || null,
    };
    return res;
  }
}
