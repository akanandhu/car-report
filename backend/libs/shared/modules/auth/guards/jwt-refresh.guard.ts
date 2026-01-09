import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom logic here
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user || info) {
      throw err || info || new UnauthorizedException('Invalid refresh token');
    }
    return user;
  }
}
