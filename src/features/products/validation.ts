import type { ProductFormData } from "./types";
import { MAX_PRODUCT_IMAGES } from "./constants";

export type ValidationResult =
  | { success: true; data: ProductFormData }
  | { success: false; errors: Record<string, string> };

export function validateProductForm(
  data: ProductFormData,
  forPublish = false
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.titleEn.trim()) {
    errors.titleEn = "English title is required";
  }

  if (!data.titleAr.trim()) {
    errors.titleAr = "Arabic title is required";
  }

  if (!data.category) {
    errors.category = "Category is required";
  }

  const validDosages = data.dosagePricing.filter((d) => d.dosage.trim());
  if (validDosages.length === 0) {
    errors.dosagePricing = "At least one dosage with price is required";
  } else {
    for (const row of validDosages) {
      const price = parseFloat(row.price);
      if (!row.price.trim() || Number.isNaN(price) || price < 0) {
        errors.dosagePricing = "Each dosage needs a valid price";
        break;
      }
    }
  }

  if (forPublish && !data.format) {
    errors.format = "Format is required to publish";
  }

  if (forPublish && data.images.length === 0) {
    errors.images = "At least one image is required to publish";
  }

  if (data.images.length > MAX_PRODUCT_IMAGES) {
    errors.images = `Maximum ${MAX_PRODUCT_IMAGES} images allowed`;
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return { success: true, data };
}
