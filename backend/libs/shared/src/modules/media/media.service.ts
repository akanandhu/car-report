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
  MediaStorageObject,
  MediaType,
  SignedReadResponse,
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

    const bucket = this.getConfiguredBucket();

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

  async createSignedReadUrls(
    items: MediaStorageObject[],
  ): Promise<SignedReadResponse> {
    const bucket = this.getConfiguredBucket();
    const uniquePaths = [
      ...new Set(
        items
          .map((item) => {
            this.validateBucket(item.bucket);
            return item.path;
          })
          .filter(Boolean),
      ),
    ];

    if (uniquePaths.length === 0) {
      return { urls: {} };
    }

    const { data, error } = await this.getSupabaseClient()
      .storage.from(bucket)
      .createSignedUrls(uniquePaths, 60 * 60);

    if (error) {
      throw new InternalServerErrorException({
        message: 'Failed to create Supabase signed read URLs',
        detail: error.message,
      });
    }

    const urls = (data || []).reduce<Record<string, string>>((result, item) => {
      if (item.path && item.signedUrl) {
        result[item.path] = item.signedUrl;
      }

      return result;
    }, {});

    return { urls };
  }

  async deleteObject(input: MediaStorageObject) {
    const bucket = this.getConfiguredBucket();
    this.validateBucket(input.bucket);

    if (!input.path) {
      throw new BadRequestException('Media path is required');
    }

    const { error } = await this.getSupabaseClient()
      .storage.from(bucket)
      .remove([input.path]);

    if (error) {
      throw new InternalServerErrorException({
        message: 'Failed to delete Supabase media object',
        detail: error.message,
      });
    }

    return { path: input.path };
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

  private getConfiguredBucket() {
    const bucket = config.supabase.storageBucket;

    if (!bucket) {
      throw new InternalServerErrorException(
        'Supabase storage is not configured',
      );
    }

    return bucket;
  }

  private validateBucket(bucket: string) {
    if (!bucket || bucket !== this.getConfiguredBucket()) {
      throw new BadRequestException('Invalid media bucket');
    }
  }
}
