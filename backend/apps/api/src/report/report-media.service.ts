import { Injectable } from '@nestjs/common';
import { SharedMediaService } from '@shared/modules/media/media.service';
import sharp from 'sharp';
import { UploadedMediaI } from './report.types';

const PDF_IMAGE_MAX_WIDTH = 1400;
const PDF_IMAGE_MAX_HEIGHT = 1000;
const PDF_IMAGE_QUALITY = 82;
const FETCH_TIMEOUT_MS = 15000;

@Injectable()
export class ReportMediaService {
  constructor(private readonly mediaService: SharedMediaService) {}

  async createPdfImageDataUrls(items: UploadedMediaI[]) {
    const images = this.uniqueImages(items);

    if (images.length === 0) {
      return {};
    }

    const signedReads = await this.mediaService.createSignedReadUrls(
      images.map((image) => ({
        bucket: image.bucket,
        path: image.path,
      })),
    );

    const entries = await Promise.all(
      images.map(async (image) => {
        const signedUrl = signedReads.urls[image.path];

        if (!signedUrl) {
          return [image.path, undefined] as const;
        }

        return [
          image.path,
          await this.createPdfSafeDataUrl(signedUrl, image),
        ] as const;
      }),
    );

    return entries.reduce<Record<string, string | undefined>>(
      (result, [path, dataUrl]) => {
        result[path] = dataUrl;
        return result;
      },
      {},
    );
  }

  private uniqueImages(items: UploadedMediaI[]) {
    const byPath = new Map<string, UploadedMediaI>();

    for (const item of items) {
      if (!item.path || item.type !== 'image') continue;
      byPath.set(item.path, item);
    }

    return [...byPath.values()];
  }

  private async createPdfSafeDataUrl(signedUrl: string, image: UploadedMediaI) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    try {
      const response = await fetch(signedUrl, { signal: controller.signal });

      if (!response.ok) {
        return undefined;
      }

      const input = Buffer.from(await response.arrayBuffer());
      const converted = await sharp(input, { failOn: 'none' })
        .rotate()
        .resize({
          width: PDF_IMAGE_MAX_WIDTH,
          height: PDF_IMAGE_MAX_HEIGHT,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: PDF_IMAGE_QUALITY, mozjpeg: true })
        .toBuffer();

      return `data:image/jpeg;base64,${converted.toString('base64')}`;
    } catch {
      return this.createOriginalDataUrlFallback(signedUrl, image);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async createOriginalDataUrlFallback(
    signedUrl: string,
    image: UploadedMediaI,
  ) {
    const mimeType = image.mimeType || '';
    const chromiumSafeMimeTypes = new Set([
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
    ]);

    if (!chromiumSafeMimeTypes.has(mimeType.toLowerCase())) {
      return undefined;
    }

    try {
      const response = await fetch(signedUrl);

      if (!response.ok) {
        return undefined;
      }

      const input = Buffer.from(await response.arrayBuffer());
      return `data:${mimeType};base64,${input.toString('base64')}`;
    } catch {
      return undefined;
    }
  }
}
