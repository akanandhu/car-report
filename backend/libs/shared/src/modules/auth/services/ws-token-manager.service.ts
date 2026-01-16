import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '@shared/config';
import { Socket } from 'socket.io';

interface TokenInfo {
  payload: any;
  expiresAt: number;
  isRefreshable: boolean;
}

interface SocketTokenState {
  tokenInfo: TokenInfo;
  userId: string;
  profileId: string;
  roles: string[];
  permissions: string[];
  lastActivity: number;
}

@Injectable()
export class WsTokenManagerService {
  private readonly logger = new Logger(WsTokenManagerService.name);
  private readonly connectedSockets = new Map<string, SocketTokenState>();
  private readonly tokenRefreshBuffer = 2 * 60 * 1000; // 2 minutes buffer before expiry

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
  ) {
    // Start token expiry checker
    this.startTokenExpiryChecker();
  }

  /**
   * Authenticate socket on initial connection and store token state
   */
  async authenticateSocket(socket: Socket, token: string): Promise<boolean> {
    try {
      const tokenInfo = await this.verifyAndParseToken(token);

      if (!tokenInfo || !tokenInfo.payload.sub) {
        this.logger.warn(`Invalid token for socket ${socket.id}`);
        return false;
      }

      // Store socket authentication state
      const socketState: SocketTokenState = {
        tokenInfo,
        userId: tokenInfo.payload.sub,
        profileId: tokenInfo.payload.profileId || null,
        roles: tokenInfo.payload.roles || [],
        permissions: tokenInfo.payload.permissions || [],
        lastActivity: Date.now(),
      };

      this.connectedSockets.set(socket.id, socketState);

      // Attach user info to socket (for backward compatibility)
      (socket as any).user = {
        userId: socketState.userId,
        profileId: socketState.profileId,
        roles: socketState.roles,
        permissions: socketState.permissions,
      };

      this.logger.log(
        `Socket ${socket.id} authenticated for user ${socketState.userId} (profileId: ${socketState.profileId})`,
      );

      // Set up token refresh notification if token is close to expiry
      this.scheduleTokenRefreshNotification(socket, tokenInfo);

      return true;
    } catch (error) {
      this.logger.error(
        `Authentication failed for socket ${socket.id}:`,
        error,
      );
      return false;
    }
  }

  /**
   * Refresh token for a specific socket
   */
  async refreshSocketToken(socket: Socket, newToken: string): Promise<boolean> {
    try {
      const tokenInfo = await this.verifyAndParseToken(newToken);

      if (!tokenInfo) {
        this.logger.warn(`Invalid refresh token for socket ${socket.id}`);
        return false;
      }

      const existingState = this.connectedSockets.get(socket.id);
      if (!existingState) {
        this.logger.warn(`No existing state for socket ${socket.id}`);
        return false;
      }

      // Verify the token belongs to the same user
      if (tokenInfo.payload.sub !== existingState.userId) {
        this.logger.warn(`Token user mismatch for socket ${socket.id}`);
        return false;
      }

      // Update socket state with new token
      existingState.tokenInfo = tokenInfo;
      existingState.lastActivity = Date.now();

      // Update user info on socket
      (socket as any).user = {
        userId: existingState.userId,
        profileId: existingState.profileId,
        roles: tokenInfo.payload.roles || [],
        permissions: tokenInfo.payload.permissions || [],
      };

      this.logger.log(`Token refreshed for socket ${socket.id}`);

      // Schedule next refresh notification
      this.scheduleTokenRefreshNotification(socket, tokenInfo);

      return true;
    } catch (error) {
      this.logger.error(`Token refresh failed for socket ${socket.id}:`, error);
      return false;
    }
  }

  /**
   * Check if socket is authenticated and token is valid
   */
  isSocketAuthenticated(socket: Socket): boolean {
    const state = this.connectedSockets.get(socket.id);

    if (!state) {
      return false;
    }

    // Check if token has expired
    if (Date.now() >= state.tokenInfo.expiresAt) {
      this.logger.warn(`Token expired for socket ${socket.id}`);
      return false;
    }

    // Update last activity
    state.lastActivity = Date.now();

    return true;
  }

  /**
   * Get user info from authenticated socket
   */
  getSocketUser(socket: Socket): {
    userId: string;
    profileId: string;
    roles: string[];
    permissions: string[];
  } | null {
    const state = this.connectedSockets.get(socket.id);

    if (!state || !this.isSocketAuthenticated(socket)) {
      return null;
    }

    return {
      userId: state.userId,
      profileId: state.profileId,
      roles: state.roles,
      permissions: state.permissions,
    };
  }

  /**
   * Remove socket from tracking on disconnect
   */
  handleSocketDisconnect(socket: Socket): void {
    const state = this.connectedSockets.get(socket.id);
    if (state) {
      this.logger.log(`Removing socket ${socket.id} for user ${state.userId}`);
      this.connectedSockets.delete(socket.id);
    }
  }

  /**
   * Verify and parse JWT token
   */
  private async verifyAndParseToken(token: string): Promise<TokenInfo | null> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.jwtSecret,
        ignoreExpiration: false,
      });

      return {
        payload,
        expiresAt: payload.exp * 1000, // Convert to milliseconds
        isRefreshable: true, // Could be determined by token type
      };
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        this.logger.debug('Token has expired');
      } else if (error.name === 'JsonWebTokenError') {
        this.logger.debug('Invalid token format');
      }
      return null;
    }
  }

  /**
   * Schedule notification to client about upcoming token expiry
   */
  private scheduleTokenRefreshNotification(
    socket: Socket,
    tokenInfo: TokenInfo,
  ): void {
    const timeUntilExpiry = tokenInfo.expiresAt - Date.now();
    const notificationTime = timeUntilExpiry - this.tokenRefreshBuffer;

    if (notificationTime > 0) {
      setTimeout(() => {
        if (this.connectedSockets.has(socket.id)) {
          socket.emit('token_refresh_required', {
            expiresAt: new Date(tokenInfo.expiresAt).toISOString(),
            expiresIn: Math.floor((tokenInfo.expiresAt - Date.now()) / 1000),
          });
        }
      }, notificationTime);
    }
  }

  /**
   * Background process to check for expired tokens and clean up
   */
  private startTokenExpiryChecker(): void {
    const checkInterval = 60 * 1000; // Check every minute

    setInterval(() => {
      const now = Date.now();
      const expiredSockets: string[] = [];

      for (const [socketId, state] of this.connectedSockets.entries()) {
        if (now >= state.tokenInfo.expiresAt) {
          expiredSockets.push(socketId);
        }
      }

      // Clean up expired sockets
      if (expiredSockets.length > 0) {
        this.logger.log(
          `Cleaning up ${expiredSockets.length} expired socket tokens`,
        );
        expiredSockets.forEach((socketId) => {
          this.connectedSockets.delete(socketId);
        });
      }
    }, checkInterval);
  }

  /**
   * Get statistics about connected sockets
   */
  getConnectionStats(): {
    totalConnections: number;
    expiringSoon: number;
    expired: number;
  } {
    const now = Date.now();
    let expiringSoon = 0;
    let expired = 0;

    for (const state of this.connectedSockets.values()) {
      const timeUntilExpiry = state.tokenInfo.expiresAt - now;

      if (timeUntilExpiry <= 0) {
        expired++;
      } else if (timeUntilExpiry <= this.tokenRefreshBuffer) {
        expiringSoon++;
      }
    }

    return {
      totalConnections: this.connectedSockets.size,
      expiringSoon,
      expired,
    };
  }
}
