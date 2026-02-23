"use client";

import React, { useRef, useState } from "react";
import Checkbox from "@/src/components/Checkbox";

type DocumentVerificationItemProps = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onCheckedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileSelect?: (file: File) => void;
};

const DocumentVerificationItem = ({
  id,
  name,
  label,
  checked,
  onCheckedChange,
  onFileSelect,
}: DocumentVerificationItemProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const resetFile = () => {
    setPreviewUrl(null);
    setFileName("");
    setFileType("");
    setProgress(0);
    setIsUploading(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const nextFileType = file.type || "";
    setFileName(file.name);
    setFileType(nextFileType);
    setPreviewUrl(URL.createObjectURL(file));
    setProgress(0);
    setIsUploading(true);

    const reader = new FileReader();
    reader.onprogress = (event) => {
      if (!event.lengthComputable) return;
      const nextProgress = Math.round((event.loaded / event.total) * 100);
      setProgress(nextProgress);
    };
    reader.onloadend = () => {
      setProgress(100);
      setIsUploading(false);
    };
    reader.readAsArrayBuffer(file);

    onFileSelect?.(file);
  };

  const renderPreview = () => {
    if (!previewUrl) return null;
    if (fileType.startsWith("image/")) {
      return (
        <img
          src={previewUrl}
          alt={fileName}
          className="w-full h-48 object-contain rounded-xl border border-gray-200 bg-white"
        />
      );
    }

    if (fileType === "application/pdf") {
      return (
        <embed
          src={previewUrl}
          type="application/pdf"
          className="w-full h-48 rounded-xl border border-gray-200 bg-white"
        />
      );
    }

    return (
      <div className="w-full h-20 rounded-xl border border-gray-200 bg-white flex items-center justify-between px-4">
        <div className="text-sm text-gray-700 font-medium">{fileName}</div>
        <span className="text-xs text-gray-500">Document</span>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      <Checkbox
        id={id}
        name={name}
        label={label}
        checked={checked}
        onChange={onCheckedChange}
      />
      <div className="space-y-3">
        <p className="text-sm font-medium">Upload Document</p>
        <div
          onClick={() => inputRef.current?.click()}
          className=" relative border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer border-gray-300 hover:border-blue-500 bg-white h-40"
        >
          <span className="text-sm text-gray-500">
            Click to upload (PDF, DOC, JPG)
          </span>
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="mt-5">
        {renderPreview()}
        </div>

        {(isUploading || progress > 0) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-600 mt-4">
              <span>Upload progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {previewUrl && (
          <button
            type="button"
            onClick={resetFile}
            className="text-xs text-red-600 hover:text-red-700"
          >
            Remove file
          </button>
        )}
      </div>
    </div>
  );
};

export default DocumentVerificationItem;
