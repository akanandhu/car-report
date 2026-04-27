import { createDecipheriv, createHash } from 'crypto';
import { EncryptionService } from './encryption.service';

describe('EncryptionService', () => {
  const originalEncryptionKey = process.env.ENCRYPTION_KEY;
  const testSecret = 'test-encryption-secret';

  beforeEach(() => {
    process.env.ENCRYPTION_KEY = testSecret;
  });

  afterEach(() => {
    if (originalEncryptionKey === undefined) {
      delete process.env.ENCRYPTION_KEY;
      return;
    }

    process.env.ENCRYPTION_KEY = originalEncryptionKey;
  });

  it('encrypts JSON-serializable payloads with AES-256-CBC', () => {
    const service = new EncryptionService();
    const payload = {
      message: 'This will be encrypted',
      nested: { id: 42, enabled: true },
    };

    const encrypted = service.encrypt(payload);
    const key = createHash('sha256').update(testSecret).digest();
    const iv = Buffer.from(encrypted.iv, 'base64');
    const decipher = createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encrypted.data, 'base64')),
      decipher.final(),
    ]).toString('utf8');

    expect(iv).toHaveLength(16);
    expect(JSON.parse(decrypted)).toEqual(payload);
  });

  it('throws when ENCRYPTION_KEY is not configured', () => {
    delete process.env.ENCRYPTION_KEY;

    expect(() => new EncryptionService()).toThrow(
      'ENCRYPTION_KEY environment variable is not defined',
    );
  });
});
