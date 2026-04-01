"use client";

import UploadFileIcon from "@/public/assets/svg/UploadFileIcon";
import React, { useRef, useState } from "react";

type UploadBoxProps = {
  label?: string;
  onFileSelect?: (file: File) => void;
  required?: boolean;
};

export default function ImageUpload({
  label,
  onFileSelect,
  required,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);

  // Handle file selection
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);

    if (file.type.startsWith("video")) {
      setFileType("video");
    } else {
      setFileType("image");
    }

    onFileSelect?.(file);
  };

  // Remove file
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setFileType(null);

    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div>
      {label && (
        <p className="text-sm font-bold mb-2 text-black">
          {label} {required ? <span className="text-red-600">*</span> : ""}
        </p>
      )}

      {/* Upload Box */}
      <div
        onClick={() => inputRef.current?.click()}
        className="relative border-2 border-dashed rounded-xl 
        flex items-center justify-center cursor-pointer transition
        border-gray-300 hover:border-blue-500 h-36 w-full"
      >
        {/* Preview */}
        {preview ? (
          <>
            {fileType === "image" ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-contain rounded-xl"
              />
            ) : (
              <video
                src={preview}
                muted
                className="w-full h-full object-contain rounded-xl"
              />
            )}

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="absolute top-0 right-0 bg-black/60 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
            >
              ✕
            </button>
          </>
        ) : (
          <span className="text-sm text-gray-400">
            <UploadFileIcon /> Upload
          </span>
        )}

        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
