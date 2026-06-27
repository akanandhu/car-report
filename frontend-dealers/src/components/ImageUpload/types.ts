import { UploadedMedia } from "@/src/utils/media";

export type UploadStatus = "idle" | "uploading" | "failed";

export type UploadBoxProps = {
  label?: string;
  value?: UploadedMedia | null;
  onFileSelect?: (media: UploadedMedia) => void;
  onFileRemove?: () => void;
  uploadFile?: (file: File) => Promise<UploadedMedia>;
  deleteFile?: (media: UploadedMedia) => Promise<void>;
  previewUrl?: string;
  required?: boolean;
  error?: string;
  allowedFileTypes?: string[];
};
