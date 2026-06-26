export type MediaType = 'image' | 'video' | 'file';

export type CreateSignedUploadInput = {
  vehicleId: string;
  documentGroupId: string;
  fieldKey: string;
  fileName: string;
  mimeType: string;
  size: number;
};

export type SignedUploadResponse = {
  bucket: string;
  path: string;
  signedUrl: string;
  token?: string;
  type: MediaType;
  mimeType: string;
  size: number;
  originalName: string;
  maxSize: number;
};
