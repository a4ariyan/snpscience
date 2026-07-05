import type { SupabaseClient } from "@supabase/supabase-js";
import { PRODUCT_IMAGES_BUCKET } from "./constants";

export function productImageStoragePath(
  productId: string,
  imageUrl: string
): string | null {
  const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/`;
  const path = imageUrl.replace(baseUrl, "");
  if (path && path.startsWith(`products/${productId}/`)) return path;
  return null;
}

export async function removeProductImages(
  supabase: SupabaseClient,
  productId: string,
  imageUrls: string[]
): Promise<void> {
  const paths = imageUrls
    .map((url) => productImageStoragePath(productId, url))
    .filter((path): path is string => path !== null);

  if (paths.length === 0) return;

  const { error } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .remove(paths);

  if (error) {
    console.error("removeProductImages error:", error);
    throw new Error(error.message);
  }
}
