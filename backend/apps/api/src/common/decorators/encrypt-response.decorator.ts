import { SetMetadata } from '@nestjs/common';

export const ENCRYPT_RESPONSE_KEY = 'encrypt_response';

export const EncryptResponse = (): ReturnType<typeof SetMetadata> =>
  SetMetadata(ENCRYPT_RESPONSE_KEY, true);
