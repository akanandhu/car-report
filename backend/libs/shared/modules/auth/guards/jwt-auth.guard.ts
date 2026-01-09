import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom logic here
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      // Optionally log or handle info for debugging
      if (info) {
        // For example, log info to console (remove in production)
        console.warn('Authentication info:', info);
      }
      throw err || new UnauthorizedException('Authentication failed');
    }
    return user;
  }
}
