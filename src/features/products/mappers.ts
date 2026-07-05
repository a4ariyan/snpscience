import type { Json, LocalizedText, ProductCategory, ProductFormat, ProductRow, ProductStatus, DosagePrice } from "@/types/supabase";
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

export function parseDosagePricing(row: ProductRow): DosagePrice[] {
  const raw = row.dosage_pricing;
  if (Array.isArray(raw)) {
    const parsed: DosagePrice[] = [];
    for (const item of raw) {
      if (!item || typeof item !== "object" || Array.isArray(item)) continue;
      const obj = item as Record<string, unknown>;
      const dosage = String(obj.dosage ?? "");
      const price = Number(obj.price);
      if (dosage && !Number.isNaN(price)) {
        parsed.push({ dosage, price });
      }
    }
    if (parsed.length > 0) return parsed;
  }

  if (row.dosage_options?.length) {
    return row.dosage_options.map((d) => ({
      dosage: d,
      price: Number(row.price),
    }));
  }

  return [{ dosage: "Standard", price: Number(row.price) }];
}

export function minDosagePrice(pricing: DosagePrice[]): number {
  return Math.min(...pricing.map((p) => p.price));
}

function parseDosagePricingInput(data: ProductFormData): DosagePrice[] {
  return data.dosagePricing
    .filter((d) => d.dosage.trim())
    .map((d) => ({
      dosage: d.dosage.trim(),
      price: parseFloat(d.price),
    }))
    .filter((d) => !Number.isNaN(d.price) && d.price >= 0);
}

export function rowToListItem(row: ProductRow): ProductListItem {
  const pricing = parseDosagePricing(row);
  return {
    id: row.id,
    slug: row.slug,
    status: row.status as ProductStatus,
    title: parseLocalizedText(row.title),
    category: row.category as ProductCategory,
    price: minDosagePrice(pricing),
    currency: row.currency,
    stockStatus: row.stock_status,
    format: row.format as ProductFormat | null,
    images: row.images ?? [],
    updatedAt: row.updated_at,
  };
}

export function rowToFormData(row: ProductRow): ProductFormData {
  const specs = parseSpecs(row);
  const pricing = parseDosagePricing(row);

  return {
    titleEn: parseLocalizedText(row.title).en,
    titleAr: parseLocalizedText(row.title).ar,
    subtitleEn: parseLocalizedText(row.subtitle).en,
    subtitleAr: parseLocalizedText(row.subtitle).ar,
    category: row.category as ProductFormData["category"],
    format: (row.format as ProductFormData["format"]) ?? "",
    stockStatus: row.stock_status,
    dosagePricing:
      pricing.length > 0
        ? pricing.map((p) => ({ dosage: p.dosage, price: String(p.price) }))
        : [{ dosage: "", price: "" }],
    images: row.images ?? [],
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

  const pricing = parseDosagePricingInput(data);
  const minPrice = pricing.length > 0 ? minDosagePrice(pricing) : 0;

  return {
    slug,
    status,
    title: { en: data.titleEn.trim(), ar: data.titleAr.trim() },
    subtitle:
      data.subtitleEn.trim() || data.subtitleAr.trim()
        ? { en: data.subtitleEn.trim(), ar: data.subtitleAr.trim() }
        : null,
    category: data.category,
    price: minPrice,
    currency: "AED",
    stock_status: data.stockStatus,
    dosage_options: pricing.length > 0 ? pricing.map((p) => p.dosage) : null,
    dosage_pricing: pricing.length > 0 ? pricing : null,
    format: data.format || null,
    images: data.images,
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
  const dosagePricing = parseDosagePricing(row);

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
    currency: row.currency,
    stockStatus: row.stock_status,
    dosagePricing,
    images: row.images ?? [],
    activeIngredients: row.active_ingredients,
    commonUses: row.common_uses,
    specs: parseSpecs(row),
    disclaimer: row.disclaimer ?? "",
  };
}

export function rowToCatalogProduct(row: ProductRow): import("./types").CatalogProduct {
  const title = parseLocalizedText(row.title);
  const subtitle = parseLocalizedText(row.subtitle);
  const pricing = parseDosagePricing(row);
  const sizeEn = subtitle.en || pricing[0]?.dosage || "";
  const sizeAr = subtitle.ar || pricing[0]?.dosage || "";
  const category = row.category as ProductCategory;
  const labels = categoryLabels(category);

  return {
    id: row.id,
    slug: row.slug,
    nameEn: title.en,
    nameAr: title.ar,
    sizeEn,
    sizeAr,
    priceAed: minDosagePrice(pricing),
    priceFrom: pricing.length > 1,
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
