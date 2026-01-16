import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@shared/modules/user/repository/user.repository';
import { RefreshtokenRepository } from '@shared/modules/refreshtoken/repository/refreshtoken.repository';
import { SharedUserroleService } from '@shared/modules/userrole/userrole.service';

export interface TokenPayload {
    userId: string;
    email: string;
    roles: string[];
}

@Injectable()
export class SharedAuthTokenService {
    private readonly accessTokenExpiry = '15m'; // 15 minutes
    private readonly refreshTokenExpiry = '7d'; // 7 days

    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository,
        private readonly refreshTokenRepository: RefreshtokenRepository,
        private readonly userroleService: SharedUserroleService,
    ) { }

    /**
     * Generate access and refresh tokens for a user
     */
    async generateTokens(userId: string) {
        const user = await this.userRepository.findUnique({ where: { id: userId } });
        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        // Get user roles
        const userRoles = await this.userroleService.getUserRoles(userId);
        const roles = userRoles.map((ur) => ur.role.identifier);

        const payload: TokenPayload = {
            userId: user.id,
            email: user.email,
            roles,
        };

        // Generate access token
        const accessToken = this.jwtService.sign(payload, {
            expiresIn: this.accessTokenExpiry,
        });

        // Generate refresh token
        const refreshTokenValue = this.jwtService.sign(
            { userId: user.id },
            { expiresIn: this.refreshTokenExpiry },
        );

        // Store refresh token in database
        const refreshTokenExpiry = new Date();
        refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7); // 7 days

        await this.refreshTokenRepository.create({
            token: refreshTokenValue,
            userId: user.id,
            expiresAt: refreshTokenExpiry,
        } as any);

        return {
            accessToken,
            refreshToken: refreshTokenValue,
            expiresIn: 900, // 15 minutes in seconds
        };
    }

    /**
     * Validate and refresh access token using refresh token
     */
    async refreshAccessToken(refreshToken: string) {
        // Validate refresh token
        const tokenRecord = await this.refreshTokenRepository.findValidToken(refreshToken);
        if (!tokenRecord) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }

        // Verify JWT
        try {
            const payload = this.jwtService.verify(refreshToken);
            const userId = payload.userId;

            // Revoke old refresh token
            await this.refreshTokenRepository.revokeToken(refreshToken);

            // Generate new tokens
            return this.generateTokens(userId);
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    /**
     * Revoke all refresh tokens for a user (logout)
     */
    async revokeUserTokens(userId: string) {
        return this.refreshTokenRepository.revokeAllUserTokens(userId);
    }

    /**
     * Verify access token and return payload
     */
    async verifyAccessToken(token: string): Promise<TokenPayload> {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid access token');
        }
    }
}
