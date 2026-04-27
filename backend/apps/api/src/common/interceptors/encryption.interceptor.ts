import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  StreamableFile,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Response } from 'express';
import { map, Observable } from 'rxjs';
import { ENCRYPT_RESPONSE_KEY } from '../decorators/encrypt-response.decorator';
import {
  EncryptedPayload,
  EncryptionService,
} from '../services/encryption.service';

@Injectable()
export class EncryptionInterceptor
  implements NestInterceptor<unknown, unknown | EncryptedPayload>
{
  constructor(
    private readonly reflector: Reflector,
    private readonly encryptionService: EncryptionService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown | EncryptedPayload> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const shouldEncryptResponse = this.reflector.getAllAndOverride<boolean>(
      ENCRYPT_RESPONSE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!shouldEncryptResponse) {
      return next.handle();
    }

    const response = context.switchToHttp().getResponse<Response>();

    return next.handle().pipe(
      map((body: unknown) => {
        if (this.shouldBypassEncryption(body, response)) {
          return body;
        }

        return this.encryptionService.encrypt(body);
      }),
    );
  }

  private shouldBypassEncryption(body: unknown, response: Response): boolean {
    const contentDisposition = response.getHeader('content-disposition');
    const contentType = response.getHeader('content-type');

    return (
      response.statusCode >= 400 ||
      body instanceof StreamableFile ||
      this.isReadableStream(body) ||
      Buffer.isBuffer(body) ||
      body instanceof Uint8Array ||
      typeof contentDisposition === 'string' ||
      (typeof contentType === 'string' &&
        !contentType.toLowerCase().includes('application/json'))
    );
  }

  private isReadableStream(body: unknown): body is NodeJS.ReadableStream {
    return (
      typeof body === 'object' &&
      body !== null &&
      'pipe' in body &&
      typeof body.pipe === 'function'
    );
  }
}
