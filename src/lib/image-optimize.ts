import sharp from "sharp";
import {
  MAX_IMAGE_SIZE_BYTES,
  MAX_IMAGE_UPLOAD_BYTES,
} from "@/features/products/constants";

const MAX_DIMENSION = 2048;
const WEBP_QUALITY_START = 88;
const WEBP_QUALITY_MIN = 72;

export interface OptimizedImage {
  buffer: Buffer;
  contentType: "image/webp";
  extension: "webp";
}

export async function optimizeImageForUpload(
  input: Buffer
): Promise<OptimizedImage> {
  if (input.length > MAX_IMAGE_UPLOAD_BYTES) {
    throw new Error(
      `Image must be under ${MAX_IMAGE_UPLOAD_BYTES / (1024 * 1024)}MB before optimization`
    );
  }

  const base = sharp(input, { failOn: "none" }).rotate().resize({
    width: MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit: "inside",
    withoutEnlargement: true,
  });

  let quality = WEBP_QUALITY_START;
  let buffer = await base.clone().webp({ quality, effort: 4 }).toBuffer();

  while (buffer.length > MAX_IMAGE_SIZE_BYTES && quality > WEBP_QUALITY_MIN) {
    quality -= 4;
    buffer = await base.clone().webp({ quality, effort: 4 }).toBuffer();
  }

  if (buffer.length > MAX_IMAGE_SIZE_BYTES) {
    throw new Error(
      "Image could not be optimized below 2MB. Try a smaller or simpler image."
    );
  }

  return { buffer, contentType: "image/webp", extension: "webp" };
}
