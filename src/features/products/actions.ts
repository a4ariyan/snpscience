"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/require-admin";
import {
  MAX_IMAGE_SIZE_BYTES,
  MAX_IMAGE_UPLOAD_BYTES,
  PRODUCT_IMAGES_BUCKET,
} from "./constants";
import { formDataToInsert, rowToFormData, slugify } from "./mappers";
import { slugExists } from "./queries";
import type { ProductFormData } from "./types";
import { validateProductForm } from "./validation";
import { optimizeImageForUpload } from "@/lib/image-optimize";

export type ActionResult =
  | { success: true; id?: string; message?: string }
  | { success: false; errors?: Record<string, string>; message?: string };

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = slugify(base);
  if (!slug) slug = "product";

  let candidate = slug;
  let counter = 1;

  while (await slugExists(candidate, excludeId)) {
    candidate = `${slug}-${counter}`;
    counter++;
  }

  return candidate;
}

export async function createProduct(
  formData: ProductFormData
): Promise<ActionResult> {
  const validation = validateProductForm(formData);
  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  const { supabase } = await requireAdmin();
  const slug = await uniqueSlug(formData.titleEn);
  const payload = formDataToInsert(formData, slug, "draft");

  const { data, error } = await supabase
    .from("products")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    console.error("createProduct error:", error);
    return { success: false, message: error.message };
  }

  revalidatePath("/admin/products");
  return { success: true, id: data.id };
}

export async function updateProduct(
  id: string,
  formData: ProductFormData,
  keepStatus?: "draft" | "active"
): Promise<ActionResult> {
  const forPublish = keepStatus === "active";
  const validation = validateProductForm(formData, forPublish);
  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }

  const { supabase } = await requireAdmin();

  const { data: existing } = await supabase
    .from("products")
    .select("status, slug, title")
    .eq("id", id)
    .single();

  if (!existing) {
    return { success: false, message: "Product not found" };
  }

  const status = keepStatus ?? existing.status;
  const slug = await uniqueSlug(formData.titleEn, id);

  const payload = formDataToInsert(formData, slug, status as "draft" | "active");

  const updatePayload: Record<string, unknown> = { ...payload };

  if (status === "active" && existing.status !== "active") {
    updatePayload.published_at = new Date().toISOString();
  } else if (status === "draft") {
    updatePayload.published_at = null;
  } else {
    delete updatePayload.published_at;
  }

  const { error } = await supabase
    .from("products")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    console.error("updateProduct error:", error);
    return { success: false, message: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}/edit`);
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  return { success: true, id };
}

export async function publishProduct(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    return { success: false, message: "Product not found" };
  }

  const formData = rowToFormData(product);

  const validation = validateProductForm(formData, true);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors,
      message: "Complete required fields before publishing",
    };
  }

  const { error } = await supabase
    .from("products")
    .update({
      status: "active",
      published_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${product.slug}`);
  return { success: true };
}

export async function unpublishProduct(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();

  const { data: product } = await supabase
    .from("products")
    .select("slug")
    .eq("id", id)
    .single();

  const { error } = await supabase
    .from("products")
    .update({ status: "draft", published_at: null })
    .eq("id", id);

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  if (product?.slug) revalidatePath(`/products/${product.slug}`);
  return { success: true };
}

export async function uploadProductImage(
  formData: FormData
): Promise<ActionResult & { url?: string }> {
  const { supabase } = await requireAdmin();

  const file = formData.get("file") as File | null;
  const productId = formData.get("productId") as string | null;

  if (!file || !productId) {
    return { success: false, message: "File and product ID are required" };
  }

  if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
    return {
      success: false,
      message: `Image must be under ${MAX_IMAGE_UPLOAD_BYTES / (1024 * 1024)}MB`,
    };
  }

  if (!file.type.startsWith("image/")) {
    return { success: false, message: "File must be an image" };
  }

  const inputBuffer = Buffer.from(await file.arrayBuffer());

  let optimized;
  try {
    optimized = await optimizeImageForUpload(inputBuffer);
  } catch (err) {
    return {
      success: false,
      message:
        err instanceof Error ? err.message : "Image optimization failed",
    };
  }

  if (optimized.buffer.length > MAX_IMAGE_SIZE_BYTES) {
    return { success: false, message: "Optimized image must be under 2MB" };
  }

  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${optimized.extension}`;
  const path = `products/${productId}/${filename}`;

  const { error: uploadError } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(path, optimized.buffer, {
      contentType: optimized.contentType,
      upsert: false,
    });

  if (uploadError) {
    console.error("uploadProductImage error:", uploadError);
    return { success: false, message: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);

  return { success: true, url: publicUrl };
}

export async function deleteProductImage(
  productId: string,
  imageUrl: string
): Promise<ActionResult> {
  const { supabase } = await requireAdmin();

  const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/`;
  const path = imageUrl.replace(baseUrl, "");

  if (path && path.startsWith(`products/${productId}/`)) {
    await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([path]);
  }

  return { success: true };
}
