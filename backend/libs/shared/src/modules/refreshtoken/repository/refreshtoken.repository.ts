import { Injectable } from '@nestjs/common';
import { RefreshToken } from '@prisma/client';
import { BaseRepository } from '@shared/common/repository/base.repository';
import { PrismaService } from '@shared/database/prisma/prisma.service';

@Injectable()
export class RefreshtokenRepository extends BaseRepository<RefreshToken> {
  protected readonly modelName = 'refreshToken';

  constructor(prisma: PrismaService) {
    super(prisma);
  }

  /**
   * Find valid (non-revoked, non-expired) refresh token
   */
  async findValidToken(token: string): Promise<RefreshToken | null> {
    return this.findFirst({
      where: {
        token,
        isRevoked: false,
        expiresAt: {
          gte: new Date(),
        },
      },
    });
  }

  /**
   * Revoke all tokens for a user
   */
  async revokeAllUserTokens(userId: string): Promise<{ count: number }> {
    return this.updateMany(
      { userId, isRevoked: false },
      { isRevoked: true },
    );
  }

  /**
   * Revoke a specific token
   */
  async revokeToken(token: string): Promise<RefreshToken> {
    const refreshToken = await this.findFirst({ where: { token } });
    if (!refreshToken) {
      throw new Error('Token not found');
    }

    return this.updateById(refreshToken.id, { isRevoked: true });
  }

  /**
   * Delete expired tokens (cleanup)
   */
  async deleteExpiredTokens(): Promise<{ count: number }> {
    return this.hardDeleteMany({
      expiresAt: {
        lt: new Date(),
      },
    });
  }
}
