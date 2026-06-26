export const MEDIA_UPLOAD_MAX_SIZES = {
  image: 5 * 1024 * 1024,
  video: 45 * 1024 * 1024,
  file: 4 * 1024 * 1024,
} as const;

export const MIME_EXTENSION_MAP: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  'video/x-msvideo': 'avi',
  'application/pdf': 'pdf',
};
