import { MEDIA_UPLOAD_MAX_SIZES, MIME_EXTENSION_MAP } from './media.constants';
import { MediaType } from './media.types';

export function detectMediaType(mimeType: string): MediaType {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  return 'file';
}

export function getMediaUploadMaxSize(type: MediaType) {
  return MEDIA_UPLOAD_MAX_SIZES[type];
}

export function resolveMediaExtension(fileName: string, mimeType: string) {
  const extension = fileName.split('.').pop()?.trim().toLowerCase();
  if (extension && /^[a-z0-9]+$/.test(extension)) return extension;
  return MIME_EXTENSION_MAP[mimeType] || 'bin';
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;

  const units = ['KB', 'MB', 'GB'];
  let size = bytes / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${Number(size.toFixed(size >= 10 ? 0 : 1))} ${units[unitIndex]}`;
}
