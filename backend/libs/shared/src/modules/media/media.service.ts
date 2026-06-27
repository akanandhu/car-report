import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { PrismaService } from '@shared/database/prisma/prisma.service';
import { config } from '@shared/config';
import {
  detectMediaType,
  formatBytes,
  getMediaUploadMaxSize,
  resolveMediaExtension,
} from './media.utils';
import {
  CreateSignedUploadInput,
  MediaType,
  SignedUploadResponse,
} from './media.types';
import WebSocket from 'ws';

@Injectable()
export class SharedMediaService {
  private supabaseClient?: SupabaseClient;

  constructor(private readonly prisma: PrismaService) {}

  async createSignedUpload(
    input: CreateSignedUploadInput,
  ): Promise<SignedUploadResponse> {
    const mediaType = detectMediaType(input.mimeType);
    const maxSize = getMediaUploadMaxSize(mediaType);

    if (input.size > maxSize) {
      throw new BadRequestException(
        `${this.getMediaTypeLabel(mediaType)} size must be ${formatBytes(maxSize)} or less`,
      );
    }

    const vehicle = await this.prisma.vehicle.findFirst({
      where: { id: input.vehicleId, deletedAt: null },
      select: { id: true },
    });

    if (!vehicle) {
      throw new NotFoundException(
        `Vehicle with ID '${input.vehicleId}' not found`,
      );
    }

    const field = await this.prisma.formField.findFirst({
      where: {
        documentGroupId: input.documentGroupId,
        fieldKey: input.fieldKey,
        type: 'file',
        isEnabled: true,
        deletedAt: null,
      },
      select: { id: true },
    });

    if (!field) {
      throw new BadRequestException(
        `Field '${input.fieldKey}' does not belong to document group '${input.documentGroupId}'`,
      );
    }

    const bucket = config.supabase.storageBucket;

    if (!bucket) {
      throw new InternalServerErrorException(
        'Supabase storage is not configured',
      );
    }

    const extension = resolveMediaExtension(input.fileName, input.mimeType);
    const objectPath = [
      'vehicles',
      input.vehicleId,
      input.documentGroupId,
      input.fieldKey,
      `${randomUUID()}.${extension}`,
    ].join('/');

    const { data, error } = await this.getSupabaseClient()
      .storage.from(bucket)
      .createSignedUploadUrl(objectPath);

    if (error) {
      throw new InternalServerErrorException({
        message: 'Failed to create Supabase signed upload URL',
        detail: error.message,
      });
    }

    if (!data?.signedUrl || !data?.path || !data?.token) {
      throw new InternalServerErrorException(
        'Supabase did not return a signed upload URL',
      );
    }

    return {
      bucket,
      path: data.path,
      signedUrl: data.signedUrl,
      token: data.token,
      type: mediaType,
      mimeType: input.mimeType,
      size: input.size,
      originalName: input.fileName,
      maxSize,
    };
  }

  private getSupabaseClient() {
    if (this.supabaseClient) return this.supabaseClient;

    const supabaseUrl = config.supabase.url;
    const serviceRoleKey = config.supabase.serviceRoleKey;

    if (!supabaseUrl || !serviceRoleKey) {
      throw new InternalServerErrorException(
        'Supabase storage is not configured',
      );
    }

    this.supabaseClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      realtime: {
        transport: WebSocket as unknown as typeof globalThis.WebSocket,
      },
    });

    return this.supabaseClient;
  }

  private getMediaTypeLabel(type: MediaType) {
    if (type === 'image') return 'Image';
    if (type === 'video') return 'Video';
    return 'File';
  }
}
