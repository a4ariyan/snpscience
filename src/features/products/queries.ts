import { createClient } from "@/lib/supabase/server";
import type { ProductRow, ProductStatus } from "@/types/supabase";
import { rowToListItem } from "./mappers";
import type { ProductListItem } from "./types";

export async function getAdminProducts(
  status: ProductStatus
): Promise<ProductListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", status)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("getAdminProducts error:", error);
    return [];
  }

  return (data as ProductRow[]).map(rowToListItem);
}

export async function getAdminProductCounts(): Promise<{
  active: number;
  draft: number;
}> {
  const supabase = await createClient();

  const [activeRes, draftRes] = await Promise.all([
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("status", "draft"),
  ]);

  return {
    active: activeRes.count ?? 0,
    draft: draftRes.count ?? 0,
  };
}

export async function getProductById(id: string): Promise<ProductRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("getProductById error:", error);
    return null;
  }

  return data as ProductRow;
}

export async function getActiveProducts(): Promise<ProductRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getActiveProducts error:", error);
    return [];
  }

  return (data as ProductRow[]) ?? [];
}

export async function getActiveProductBySlug(
  slug: string
): Promise<ProductRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    console.error("getActiveProductBySlug error:", error);
    return null;
  }

  return data as ProductRow | null;
}

export async function slugExists(slug: string, excludeId?: string): Promise<boolean> {
  const supabase = await createClient();

  let query = supabase.from("products").select("id").eq("slug", slug);

  if (excludeId) {
    query = query.neq("id", excludeId);
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error("slugExists error:", error);
    return false;
  }

  return data !== null;
}
