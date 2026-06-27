"use client";

import { Camera, CheckCircle2, Loader2, X } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  compressImageFile,
  detectMediaType,
  formatBytes,
  getMediaLabel,
  getMediaUploadMaxSize,
  validateAllowedFileType,
} from "@/src/utils/media";
import { UploadBoxProps, UploadStatus } from "./types";

type DisplayStatus = UploadStatus | "uploaded";

export default function ImageUpload({
  label,
  value,
  onFileSelect,
  onFileRemove,
  uploadFile,
  required,
  error,
  allowedFileTypes,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previewRef = useRef<string | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [localError, setLocalError] = useState("");
  const displayError = localError || error;
  const displayStatus: DisplayStatus =
    uploadStatus === "uploading" || uploadStatus === "failed"
      ? uploadStatus
      : value
        ? "uploaded"
        : "idle";
  const accept =
    allowedFileTypes && allowedFileTypes.length > 0
      ? allowedFileTypes.join(",")
      : "image/*,video/*,application/pdf";

  const setPreviewUrl = (url: string | null) => {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = url;
    setPreview(url);
  };

  const validateFile = (file: File) => {
    const allowedError = validateAllowedFileType(file, allowedFileTypes);
    if (allowedError) return allowedError;

    const mediaType = detectMediaType(file.type);
    const maxFileSize = getMediaUploadMaxSize(mediaType);

    if (mediaType !== "image" && file.size > maxFileSize) {
      return `${getMediaLabel(mediaType)} size must be ${formatBytes(maxFileSize)} or less`;
    }

    return "";
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setLocalError(validationError);
      e.target.value = "";
      return;
    }

    const originalType = detectMediaType(file.type);
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrl(previewUrl);
    setFileType(
      originalType === "image" || originalType === "video"
        ? originalType
        : null,
    );
    setLocalError("");
    setUploadStatus("uploading");

    try {
      const uploadCandidate =
        originalType === "image" ? await compressImageFile(file) : file;
      const maxFileSize = getMediaUploadMaxSize(originalType);

      if (uploadCandidate.size > maxFileSize) {
        throw new Error(
          `${getMediaLabel(originalType)} size must be ${formatBytes(maxFileSize)} or less after compression`,
        );
      }

      if (!uploadFile) {
        throw new Error("Upload is not configured for this field");
      }

      const uploadedMedia = await uploadFile(uploadCandidate);
      setUploadStatus("idle");
      onFileSelect?.(uploadedMedia);
    } catch (uploadError) {
      setUploadStatus("failed");
      setLocalError(
        uploadError instanceof Error
          ? uploadError.message
          : "Failed to upload media. Please try again.",
      );
    } finally {
      e.target.value = "";
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setFileType(null);
    setUploadStatus("idle");
    setLocalError("");
    onFileRemove?.();

    if (inputRef.current) inputRef.current.value = "";
  };

  const hasMedia = Boolean(preview || value);

  return (
    <div>
      {label && (
        <p className="mb-2 text-sm font-medium text-slate-700">
          {label} {required ? <span className="text-red-600">*</span> : ""}
        </p>
      )}

      <div
        onClick={() => {
          if (displayStatus !== "uploading") inputRef.current?.click();
        }}
        className={`relative flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed bg-slate-50 text-slate-500 transition-all hover:bg-slate-100 hover:text-blue-500 ${
          displayError
            ? "border-red-400 hover:border-red-500"
            : "border-[#cbd5e1] hover:border-[#94a3b8]"
        } ${displayStatus === "uploading" ? "pointer-events-none opacity-80" : ""}`}
      >
        {hasMedia ? (
          <>
            {preview && fileType === "image" ? (
              <img
                src={preview}
                alt="preview"
                className="h-full w-full rounded-xl object-contain"
              />
            ) : preview && fileType === "video" ? (
              <video
                src={preview}
                muted
                className="h-full w-full rounded-xl object-contain"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 px-3 text-center text-slate-600">
                <CheckCircle2 size={24} className="text-emerald-500" />
                <span className="line-clamp-2 text-xs font-semibold">
                  {value?.originalName || "Uploaded media"}
                </span>
              </div>
            )}

            {displayStatus !== "idle" ? (
              <div className="absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-1 text-[11px] font-semibold text-white">
                {displayStatus === "uploading"
                  ? "Uploading"
                  : displayStatus === "failed"
                    ? "Failed"
                    : "Uploaded"}
              </div>
            ) : null}

            {displayStatus === "uploading" ? (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/70 text-blue-600">
                <Loader2 size={24} className="animate-spin" />
              </div>
            ) : null}

            <button
              onClick={handleRemove}
              type="button"
              aria-label="Remove media"
              className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 text-[#64748b]">
            <Camera size={24} />
            <span className="text-xs font-semibold">Add Media</span>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleChange}
        />
      </div>
      {displayError ? (
        <p className="mt-2 text-sm font-medium text-red-600">{displayError}</p>
      ) : null}
    </div>
  );
}
