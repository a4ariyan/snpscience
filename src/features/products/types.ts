import type { LocalizedText, ProductRow } from "@/types/supabase";
import type { ProductCategory, ProductFormat } from "@/types/supabase";

export interface ProductFormData {
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  category: ProductCategory;
  format: ProductFormat | "";
  price: string;
  stockStatus: boolean;
  dosageOptions: string[];
  images: string[];
  labResultsImage: string;
  purityPercentage: string;
  labMethod: string;
  descriptionEn: string;
  descriptionAr: string;
  activeIngredients: string;
  commonUses: string;
  specs: { key: string; value: string }[];
  disclaimer: string;
}

export interface ProductListItem {
  id: string;
  slug: string;
  status: ProductRow["status"];
  title: LocalizedText;
  category: ProductCategory;
  price: number;
  currency: string;
  stockStatus: boolean;
  format: ProductFormat | null;
  images: string[];
  updatedAt: string;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  sizeEn: string;
  sizeAr: string;
  priceAed: number;
  priceFrom: boolean;
  rating: number | null;
  reviewCount: number;
  categories: string[];
  categoryLabelEn: string;
  categoryLabelAr: string;
  format: ProductFormat;
  stockStatus: boolean;
  image?: string;
}

export interface ProductDetail {
  id: string;
  slug: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
  category: ProductCategory;
  categoryLabelEn: string;
  categoryLabelAr: string;
  format: ProductFormat;
  formatLabelEn: string;
  formatLabelAr: string;
  price: number;
  currency: string;
  stockStatus: boolean;
  dosageOptions: string[];
  images: string[];
  labResultsImage: string | null;
  purityPercentage: number | null;
  labMethod: string | null;
  activeIngredients: string | null;
  commonUses: string | null;
  specs: { key: string; value: string }[];
  disclaimer: string;
}

export function emptyProductForm(): ProductFormData {
  return {
    titleEn: "",
    titleAr: "",
    subtitleEn: "",
    subtitleAr: "",
    category: "Recovery & Repair",
    format: "vial",
    price: "",
    stockStatus: true,
    dosageOptions: [],
    images: [],
    labResultsImage: "",
    purityPercentage: "",
    labMethod: "",
    descriptionEn: "",
    descriptionAr: "",
    activeIngredients: "",
    commonUses: "",
    specs: [],
    disclaimer:
      "For laboratory research use only. Not for human consumption.",
  };
}
