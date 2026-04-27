import { Global, Module } from '@nestjs/common';
import { EncryptionInterceptor } from './interceptors/encryption.interceptor';
import { EncryptionService } from './services/encryption.service';

@Global()
@Module({
  providers: [EncryptionService, EncryptionInterceptor],
  exports: [EncryptionService, EncryptionInterceptor],
})
export class CommonModule {}
