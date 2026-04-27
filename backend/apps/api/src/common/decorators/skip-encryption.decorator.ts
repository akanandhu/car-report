import { SetMetadata } from '@nestjs/common';

export const SKIP_ENCRYPTION_KEY = 'skipEncryption';

export const SkipEncryption = (): ReturnType<typeof SetMetadata> =>
  SetMetadata(SKIP_ENCRYPTION_KEY, true);
