import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { createCipheriv, createHash, randomBytes } from 'crypto';

export interface EncryptedPayload {
  iv: string;
  data: string;
}

@Injectable()
export class EncryptionService {
  private static readonly ALGORITHM = 'aes-256-cbc';
  private static readonly IV_LENGTH = 16;

  private readonly key: Buffer;

  constructor() {
    const secret = process.env.ENCRYPTION_KEY;

    if (!secret) {
      throw new Error('ENCRYPTION_KEY environment variable is not defined');
    }

    this.key = createHash('sha256').update(secret).digest();
  }

  encrypt(data: unknown): EncryptedPayload {
    try {
      const iv = randomBytes(EncryptionService.IV_LENGTH);
      const cipher = createCipheriv(
        EncryptionService.ALGORITHM,
        this.key,
        iv,
      );
      const serialized = JSON.stringify(data ?? null);
      const encrypted = Buffer.concat([
        cipher.update(serialized, 'utf8'),
        cipher.final(),
      ]);

      return {
        iv: iv.toString('base64'),
        data: encrypted.toString('base64'),
      };
    } catch {
      throw new InternalServerErrorException(
        'Failed to encrypt response payload',
      );
    }
  }
}
