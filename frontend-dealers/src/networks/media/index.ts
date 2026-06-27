import { apiClient } from "../client";
import {
  CreateSignedUploadPayload,
  MediaStorageObjectPayload,
  SignedReadsResponse,
  SignedUploadResponse,
  UploadEvaluationMediaPayload,
} from "./types";
import { UploadedMedia } from "@/src/utils/media";

type ApiResponse<T> = {
  data: T;
  message: string;
  statusCode: number;
};

export const createSignedMediaUpload = async (
  payload: CreateSignedUploadPayload,
) => {
  const res = await apiClient<ApiResponse<SignedUploadResponse>>(
    "media/signed-upload",
    {
      method: "POST",
      body: payload,
    },
  );

  return res.data;
};

const uploadToSignedUrl = async (signedUpload: SignedUploadResponse, file: File) => {
  const formData = new FormData();
  formData.append("cacheControl", "3600");
  formData.append("", file);

  const response = await fetch(signedUpload.signedUrl, {
    method: "PUT",
    headers: {
      "x-upsert": "false",
    },
    body: formData,
  });

  if (!response.ok) {
    let detail = response.statusText;
    try {
      const payload = await response.json();
      detail = payload?.message || payload?.error || detail;
    } catch {
      // Supabase may return a non-JSON error body.
    }

    throw new Error(detail || "Failed to upload media");
  }
};

export const uploadEvaluationMedia = async ({
  vehicleId,
  documentGroupId,
  fieldKey,
  file,
}: UploadEvaluationMediaPayload): Promise<UploadedMedia> => {
  const signedUpload = await createSignedMediaUpload({
    vehicleId,
    documentGroupId,
    fieldKey,
    fileName: file.name,
    mimeType: file.type || "application/octet-stream",
    size: file.size,
  });

  await uploadToSignedUrl(signedUpload, file);

  return {
    type: signedUpload.type,
    bucket: signedUpload.bucket,
    path: signedUpload.path,
    mimeType: file.type || signedUpload.mimeType,
    size: file.size,
    originalName: signedUpload.originalName,
    uploadedAt: new Date().toISOString(),
  };
};

export const createSignedMediaReads = async (
  items: MediaStorageObjectPayload[],
) => {
  const res = await apiClient<ApiResponse<SignedReadsResponse>>(
    "media/signed-reads",
    {
      method: "POST",
      body: { items },
    },
  );

  return res.data;
};

export const deleteUploadedMedia = async (media: MediaStorageObjectPayload) => {
  const res = await apiClient<ApiResponse<{ path: string }>>("media", {
    method: "DELETE",
    body: media,
  });

  return res.data;
};
