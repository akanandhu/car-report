"use client";

import { Camera, X } from "lucide-react";
import React, { useRef, useState } from "react";

type UploadBoxProps = {
  label?: string;
  value?: string | File | null;
  onFileSelect?: (file: File) => void;
  onFileRemove?: () => void;
  required?: boolean;
  error?: string;
  allowedFileTypes?: string[];
  maxFileSize?: number;
};

const formatBytes = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;

  const units = ["KB", "MB", "GB"];
  let size = bytes / 1024;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }

  return `${Number(size.toFixed(size >= 10 ? 0 : 1))} ${units[unitIndex]}`;
};

const normalizeExtension = (extension: string) =>
  extension.trim().toLowerCase().replace(/^\./, "");

export default function ImageUpload({
  label,
  value,
  onFileSelect,
  onFileRemove,
  required,
  error,
  allowedFileTypes,
  maxFileSize,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const resolveInitialPreview = (v: string | File | null | undefined) => {
    if (!v) return null;
    if (typeof v === "string") return v;
    return URL.createObjectURL(v);
  };

  const resolveInitialFileType = (v: string | File | null | undefined): "image" | "video" | null => {
    if (!v) return null;
    if (typeof v === "string") {
      if (/\.(mp4|mov|avi|webm|mkv)$/i.test(v)) return "video";
      return "image";
    }
    return v.type.startsWith("video") ? "video" : "image";
  };

  const [preview, setPreview] = useState<string | null>(() => resolveInitialPreview(value));
  const [fileType, setFileType] = useState<"image" | "video" | null>(() => resolveInitialFileType(value));

  React.useEffect(() => {
    if (value && typeof value === "string") {
      setPreview(value);
      setFileType(/\.(mp4|mov|avi|webm|mkv)$/i.test(value) ? "video" : "image");
    } else if (!value) {
      setPreview(null);
      setFileType(null);
    }
  }, [value]);
  const [localError, setLocalError] = useState<string>("");
  const displayError = localError || error;
  const accept =
    allowedFileTypes && allowedFileTypes.length > 0
      ? allowedFileTypes.join(",")
      : "image/*,video/*";

  const validateFile = (file: File) => {
    if (allowedFileTypes?.length) {
      const fileExtension = normalizeExtension(file.name.split(".").pop() || "");
      const isAllowed = allowedFileTypes
        .map(normalizeExtension)
        .includes(fileExtension);

      if (!isAllowed) {
        return `Allowed formats: ${allowedFileTypes.join(", ")}`;
      }
    }

    if (maxFileSize && file.size > maxFileSize) {
      return `File size must be ${formatBytes(maxFileSize)} or less`;
    }

    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateFile(file);

    if (validationError) {
      setLocalError(validationError);
      e.target.value = "";
      return;
    }

    setLocalError("");
    const url = URL.createObjectURL(file);
    setPreview(url);

    if (file.type.startsWith("video")) {
      setFileType("video");
    } else {
      setFileType("image");
    }

    onFileSelect?.(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setFileType(null);
    setLocalError("");
    onFileRemove?.();

    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {label && (
        <p className="text-sm font-medium text-slate-700 mb-2">
          {label} {required ? <span className="text-red-600">*</span> : ""}
        </p>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        className={`w-full h-32 relative rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center gap-2 hover:bg-slate-100 hover:border-blue-400 transition-all text-slate-500 hover:text-blue-500 cursor-pointer ${
          displayError
            ? "border-red-400 hover:border-red-500"
            : "border-[#cbd5e1] hover:border-[#94a3b8]"
        }`}
      >
        {preview ? (
          <>
            {fileType === "image" ? (
              <img
                src={preview}
                alt="preview"
                className="h-full w-full rounded-2xl object-contain"
              />
            ) : (
              <video
                src={preview}
                muted
                className="h-full w-full rounded-2xl object-contain"
              />
            )}

            <button
              onClick={handleRemove}
              type="button"
              aria-label="Remove image"
              className="  absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-600"
            >
              <X size={18}  />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 text-[#64748b]">
            <Camera size={24}  />
            <span className="text-xs font-semibold">Add Image</span>
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
