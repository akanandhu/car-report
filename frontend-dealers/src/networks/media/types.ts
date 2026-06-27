import { UploadedMedia } from "@/src/utils/media";

export type CreateSignedUploadPayload = {
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
  type: UploadedMedia["type"];
  mimeType: string;
  size: number;
  originalName: string;
  maxSize: number;
};

export type UploadEvaluationMediaPayload = {
  vehicleId: string;
  documentGroupId: string;
  fieldKey: string;
  file: File;
};

export type MediaStorageObjectPayload = Pick<UploadedMedia, "bucket" | "path">;

export type SignedReadsResponse = {
  urls: Record<string, string>;
};
