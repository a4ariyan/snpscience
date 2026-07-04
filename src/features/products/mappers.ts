import type { Json, LocalizedText, ProductCategory, ProductFormat, ProductRow, ProductStatus } from "@/types/supabase";
import type { ProductFormData, ProductListItem, ProductDetail } from "./types";
import { CATEGORY_TO_FILTER, PRODUCT_CATEGORIES, PRODUCT_FORMATS } from "./constants";

export function parseLocalizedText(value: Json | null | undefined): LocalizedText {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    return {
      en: typeof obj.en === "string" ? obj.en : "",
      ar: typeof obj.ar === "string" ? obj.ar : "",
    };
  }
  return { en: "", ar: "" };
}

export function rowToListItem(row: ProductRow): ProductListItem {
  return {
    id: row.id,
    slug: row.slug,
    status: row.status as ProductStatus,
    title: parseLocalizedText(row.title),
    category: row.category as ProductCategory,
    price: Number(row.price),
    currency: row.currency,
    stockStatus: row.stock_status,
    format: row.format as ProductFormat | null,
    images: row.images ?? [],
    updatedAt: row.updated_at,
  };
}

export function rowToFormData(row: ProductRow): ProductFormData {
  const specs = parseSpecs(row);

  return {
    titleEn: parseLocalizedText(row.title).en,
    titleAr: parseLocalizedText(row.title).ar,
    subtitleEn: parseLocalizedText(row.subtitle).en,
    subtitleAr: parseLocalizedText(row.subtitle).ar,
    category: row.category as ProductFormData["category"],
    format: (row.format as ProductFormData["format"]) ?? "",
    price: String(row.price),
    stockStatus: row.stock_status,
    dosageOptions: row.dosage_options ?? [],
    images: row.images ?? [],
    labResultsImage: row.lab_results_image ?? "",
    purityPercentage: row.purity_percentage != null ? String(row.purity_percentage) : "",
    labMethod: row.lab_method ?? "",
    descriptionEn: parseLocalizedText(row.description).en,
    descriptionAr: parseLocalizedText(row.description).ar,
    activeIngredients: row.active_ingredients ?? "",
    commonUses: row.common_uses ?? "",
    specs,
    disclaimer: row.disclaimer ?? "",
  };
}

export function formDataToInsert(
  data: ProductFormData,
  slug: string,
  status: "draft" | "active" = "draft"
) {
  const specs =
    data.specs.length > 0
      ? Object.fromEntries(
          data.specs
            .filter((s) => s.key.trim())
            .map((s) => [s.key.trim(), s.value.trim()])
        )
      : null;

  return {
    slug,
    status,
    title: { en: data.titleEn.trim(), ar: data.titleAr.trim() },
    subtitle:
      data.subtitleEn.trim() || data.subtitleAr.trim()
        ? { en: data.subtitleEn.trim(), ar: data.subtitleAr.trim() }
        : null,
    category: data.category,
    price: parseFloat(data.price),
    currency: "AED",
    stock_status: data.stockStatus,
    dosage_options: data.dosageOptions.length > 0 ? data.dosageOptions : null,
    format: data.format || null,
    images: data.images,
    lab_results_image: data.labResultsImage.trim() || null,
    purity_percentage: data.purityPercentage
      ? parseFloat(data.purityPercentage)
      : null,
    lab_method: data.labMethod.trim() || null,
    description:
      data.descriptionEn.trim() || data.descriptionAr.trim()
        ? { en: data.descriptionEn.trim(), ar: data.descriptionAr.trim() }
        : null,
    active_ingredients: data.activeIngredients.trim() || null,
    common_uses: data.commonUses.trim() || null,
    specs,
    disclaimer: data.disclaimer.trim() || null,
    published_at: status === "active" ? new Date().toISOString() : null,
  };
}

function parseSpecs(row: ProductRow): { key: string; value: string }[] {
  if (row.specs && typeof row.specs === "object" && !Array.isArray(row.specs)) {
    return Object.entries(row.specs as Record<string, string>).map(
      ([key, value]) => ({ key, value: String(value) })
    );
  }
  return [];
}

function categoryLabels(category: ProductCategory) {
  const match = PRODUCT_CATEGORIES.find((c) => c.value === category);
  return {
    categoryLabelEn: match?.labelEn ?? category,
    categoryLabelAr: match?.labelAr ?? category,
  };
}

function formatLabels(format: ProductFormat) {
  const match = PRODUCT_FORMATS.find((f) => f.value === format);
  return {
    formatLabelEn: match?.labelEn ?? format,
    formatLabelAr: match?.labelAr ?? format,
  };
}

export function rowToProductDetail(row: ProductRow): ProductDetail {
  const category = row.category as ProductCategory;
  const format = (row.format as ProductFormat) ?? "vial";

  return {
    id: row.id,
    slug: row.slug,
    title: parseLocalizedText(row.title),
    subtitle: parseLocalizedText(row.subtitle),
    description: parseLocalizedText(row.description),
    category,
    ...categoryLabels(category),
    format,
    ...formatLabels(format),
    price: Number(row.price),
    currency: row.currency,
    stockStatus: row.stock_status,
    dosageOptions: row.dosage_options ?? [],
    images: row.images ?? [],
    labResultsImage: row.lab_results_image,
    purityPercentage: row.purity_percentage != null ? Number(row.purity_percentage) : null,
    labMethod: row.lab_method,
    activeIngredients: row.active_ingredients,
    commonUses: row.common_uses,
    specs: parseSpecs(row),
    disclaimer: row.disclaimer ?? "",
  };
}

export function rowToCatalogProduct(row: ProductRow): import("./types").CatalogProduct {
  const title = parseLocalizedText(row.title);
  const subtitle = parseLocalizedText(row.subtitle);
  const sizeEn = subtitle.en || (row.dosage_options?.[0] ?? "");
  const sizeAr = subtitle.ar || (row.dosage_options?.[0] ?? "");
  const category = row.category as ProductCategory;
  const labels = categoryLabels(category);

  return {
    id: row.id,
    slug: row.slug,
    nameEn: title.en,
    nameAr: title.ar,
    sizeEn,
    sizeAr,
    priceAed: Number(row.price),
    priceFrom: (row.dosage_options?.length ?? 0) > 1,
    rating: null,
    reviewCount: 0,
    categories: [CATEGORY_TO_FILTER[category]],
    categoryLabelEn: labels.categoryLabelEn,
    categoryLabelAr: labels.categoryLabelAr,
    format: (row.format as ProductFormat) ?? "vial",
    stockStatus: row.stock_status,
    image: row.images?.[0],
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[()]/g, " ")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
