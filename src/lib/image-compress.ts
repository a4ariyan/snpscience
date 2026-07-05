import {
  MAX_IMAGE_SIZE_BYTES,
  MAX_IMAGE_UPLOAD_BYTES,
} from "@/features/products/constants";

const MAX_DIMENSION = 2048;
const WEBP_QUALITY_START = 0.88;
const WEBP_QUALITY_MIN = 0.72;

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Compression failed"))),
      type,
      quality
    );
  });
}

function supportsWebP(): boolean {
  const canvas = document.createElement("canvas");
  return canvas.toDataURL("image/webp").startsWith("data:image/webp");
}

export async function compressImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;

  if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
    throw new Error(
      `Image must be under ${MAX_IMAGE_UPLOAD_BYTES / (1024 * 1024)}MB`
    );
  }

  if (
    file.type === "image/webp" &&
    file.size <= MAX_IMAGE_SIZE_BYTES
  ) {
    return file;
  }

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(
    1,
    MAX_DIMENSION / Math.max(bitmap.width, bitmap.height)
  );
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return file;

  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const outputType = supportsWebP() ? "image/webp" : "image/jpeg";
  const extension = outputType === "image/webp" ? "webp" : "jpg";

  let quality = WEBP_QUALITY_START;
  let blob = await canvasToBlob(canvas, outputType, quality);

  while (blob.size > MAX_IMAGE_SIZE_BYTES && quality > WEBP_QUALITY_MIN) {
    quality -= 0.04;
    blob = await canvasToBlob(canvas, outputType, quality);
  }

  if (blob.size > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(
      "Image could not be compressed below 2MB. Try a smaller image."
    );
  }

  const baseName = file.name.replace(/\.[^.]+$/, "") || "image";
  return new File([blob], `${baseName}.${extension}`, { type: outputType });
}
