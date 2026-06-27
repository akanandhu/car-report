export type MediaType = "image" | "video" | "file";

export type UploadedMedia = {
  type: MediaType;
  bucket: string;
  path: string;
  mimeType: string;
  size: number;
  originalName: string;
  uploadedAt: string;
};

export const MEDIA_UPLOAD_MAX_SIZES: Record<MediaType, number> = {
  image: 5 * 1024 * 1024,
  video: 45 * 1024 * 1024,
  file: 4 * 1024 * 1024,
};

const IMAGE_OUTPUT_TYPE = "image/jpeg";
const IMAGE_OUTPUT_EXTENSION = "jpg";
const MAX_IMAGE_DIMENSION = 1920;
const IMAGE_QUALITY_STEPS = [0.82, 0.72, 0.62, 0.52, 0.42];

export const formatBytes = (bytes: number) => {
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

export const normalizeExtension = (extension: string) =>
  extension.trim().toLowerCase().replace(/^\./, "");

export const detectMediaType = (mimeType: string): MediaType => {
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType.startsWith("video/")) return "video";
  return "file";
};

export const getMediaUploadMaxSize = (type: MediaType) =>
  MEDIA_UPLOAD_MAX_SIZES[type];

export const validateAllowedFileType = (
  file: File,
  allowedFileTypes?: string[],
) => {
  if (!allowedFileTypes?.length) return "";

  const fileExtension = normalizeExtension(file.name.split(".").pop() || "");
  const isAllowed = allowedFileTypes
    .map(normalizeExtension)
    .includes(fileExtension);

  return isAllowed ? "" : `Allowed formats: ${allowedFileTypes.join(", ")}`;
};

const getCompressedImageName = (fileName: string) => {
  const withoutExtension = fileName.replace(/\.[^.]+$/, "");
  return `${withoutExtension || "image"}.${IMAGE_OUTPUT_EXTENSION}`;
};

const loadImage = (file: File) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image file"));
    };
    image.src = url;
  });

const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type: string,
  quality: number,
) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not compress image"));
      },
      type,
      quality,
    );
  });

export const compressImageFile = async (file: File) => {
  const image = await loadImage(file);
  const scale = Math.min(
    1,
    MAX_IMAGE_DIMENSION / Math.max(image.naturalWidth, image.naturalHeight),
  );
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Image compression is not supported in this browser");
  }

  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, 0, 0, width, height);

  let bestBlob: Blob | null = null;
  for (const quality of IMAGE_QUALITY_STEPS) {
    const blob = await canvasToBlob(canvas, IMAGE_OUTPUT_TYPE, quality);
    bestBlob = blob;
    if (blob.size <= MEDIA_UPLOAD_MAX_SIZES.image) break;
  }

  if (!bestBlob) {
    throw new Error("Could not compress image");
  }

  const compressedFile = new File(
    [bestBlob],
    getCompressedImageName(file.name),
    {
      type: IMAGE_OUTPUT_TYPE,
      lastModified: Date.now(),
    },
  );

  if (
    file.size <= MEDIA_UPLOAD_MAX_SIZES.image &&
    compressedFile.size > file.size
  ) {
    return file;
  }

  return compressedFile;
};

export const isUploadedMedia = (value: unknown): value is UploadedMedia =>
  Boolean(
    value &&
    typeof value === "object" &&
    "bucket" in value &&
    "path" in value &&
    "mimeType" in value,
  );

export const getMediaLabel = (type: UploadedMedia["type"]) => {
  if (type === "image") return "Image";
  if (type === "video") return "Video";
  return "File";
};
