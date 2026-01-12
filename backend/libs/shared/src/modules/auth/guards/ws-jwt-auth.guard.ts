import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Socket } from 'socket.io';
import { WsTokenManagerService } from '../services/ws-token-manager.service';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(WsJwtAuthGuard.name);

  constructor(private readonly wsTokenManager: WsTokenManagerService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();

    try {
      // Check if socket is already authenticated
      if (this.wsTokenManager.isSocketAuthenticated(client)) {
        return true;
      }

      // Try to authenticate with token
      const token = this.extractTokenFromClient(client);
      if (!token) {
        this.logger.warn(`No token found for client ${client.id}`);
        throw new UnauthorizedException('No token provided');
      }
      // Use token manager to authenticate
      const isAuthenticated = await this.wsTokenManager.authenticateSocket(
        client,
        token,
      );

      if (!isAuthenticated) {
        throw new UnauthorizedException('Authentication failed');
      }

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        this.logger.warn(
          `Authentication failed for client ${client.id}: ${error.message}`,
        );
      } else {
        this.logger.error(
          `Authentication error for client ${client.id}:`,
          error,
        );
      }

      // Disconnect the client on authentication failure
      client.disconnect(true);
      throw new UnauthorizedException('WebSocket authentication failed');
    }
  }

  /**
   * Extract JWT token from various Socket.IO client sources
   */
  private extractTokenFromClient(client: Socket): string | null {
    try {
      console.log('reaching here');
      // Method 1: From handshake auth object (preferred)
      if (client.handshake?.auth['token']) {
        return client.handshake.auth['token'];
      }

      // Method 2: From Authorization header
      const authHeader = client.handshake?.headers?.authorization;
      if (authHeader) {
        // Support "Bearer <token>" format
        const bearerMatch = authHeader.match(/^Bearer\s+(.+)$/i);
        if (bearerMatch) {
          return bearerMatch[1];
        }
        // Support direct token
        return authHeader;
      }
      return null;
    } catch (error) {
      this.logger.error('Error extracting token from client:', error);
      return null;
    }
  }
}
