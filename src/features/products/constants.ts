import type { ProductCategory, ProductFormat, ProductStatus } from "@/types/supabase";

export const PRODUCT_CATEGORIES: {
  value: ProductCategory;
  labelEn: string;
  labelAr: string;
  filterId: string;
}[] = [
  {
    value: "Recovery & Repair",
    labelEn: "Recovery & Repair",
    labelAr: "التعافي والإصلاح",
    filterId: "recovery",
  },
  {
    value: "Metabolic & Weight",
    labelEn: "Metabolic & Weight",
    labelAr: "الأيض والوزن",
    filterId: "metabolic",
  },
  {
    value: "Longevity & Immune",
    labelEn: "Longevity & Immune",
    labelAr: "طول العمر والمناعة",
    filterId: "longevity",
  },
  {
    value: "Skin & Beauty",
    labelEn: "Skin & Beauty",
    labelAr: "البشرة والجمال",
    filterId: "skin",
  },
  {
    value: "Cognitive & Neuro",
    labelEn: "Cognitive & Neuro",
    labelAr: "الإدراك والأعصاب",
    filterId: "cognitive",
  },
  {
    value: "Growth & Body",
    labelEn: "Growth & Body",
    labelAr: "النمو والجسم",
    filterId: "growth",
  },
];

export const PRODUCT_FORMATS: {
  value: ProductFormat;
  labelEn: string;
  labelAr: string;
}[] = [
  { value: "vial", labelEn: "Vial", labelAr: "قارورة" },
  { value: "pen", labelEn: "Pen", labelAr: "قلم" },
  { value: "spray", labelEn: "Spray", labelAr: "بخاخ" },
];

export const PRODUCT_STATUSES: { value: ProductStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
];

export const CATEGORY_TO_FILTER: Record<ProductCategory, string> =
  Object.fromEntries(
    PRODUCT_CATEGORIES.map((c) => [c.value, c.filterId])
  ) as Record<ProductCategory, string>;

export const FILTER_TO_CATEGORY: Record<string, ProductCategory> =
  Object.fromEntries(
    PRODUCT_CATEGORIES.map((c) => [c.filterId, c.value])
  ) as Record<string, ProductCategory>;

export const PRODUCT_IMAGES_BUCKET = "product-images";
export const MAX_PRODUCT_IMAGES = 5;
export const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;
export const MAX_IMAGE_UPLOAD_BYTES = 15 * 1024 * 1024;

export const DEFAULT_DISCLAIMER =
  "For laboratory research use only. Not for human consumption.";
