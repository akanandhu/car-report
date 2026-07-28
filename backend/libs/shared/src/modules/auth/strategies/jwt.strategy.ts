import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayloadI } from '../service/auth-token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    });
  }

  validate(payload: TokenPayloadI) {
    if (!payload.userId) {
      throw new UnauthorizedException();
    }

    return {
      userId: payload.userId,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
