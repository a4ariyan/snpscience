export const PRODUCT_PLACEHOLDER_IMAGE = "/sample_product_image.png";

export type ProductCategoryId =
  | "recovery"
  | "metabolic"
  | "longevity"
  | "cognitive";

export type ProductFormatId = "vial" | "pen" | "spray";

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  sizeEn: string;
  sizeAr: string;
  priceAed: number;
  priceFrom?: boolean;
  rating: number;
  reviewCount: number;
  categories: ProductCategoryId[];
  format: ProductFormatId;
  image?: string;
}

export const productCategories = [
  {
    id: "all" as const,
    labelEn: "All peptides",
    labelAr: "جميع الببتيدات",
  },
  {
    id: "recovery" as const,
    labelEn: "Recovery & Repair",
    labelAr: "التعافي والإصلاح",
  },
  {
    id: "metabolic" as const,
    labelEn: "Metabolic & Weight",
    labelAr: "الأيض والوزن",
  },
  {
    id: "longevity" as const,
    labelEn: "Longevity",
    labelAr: "طول العمر",
  },
  {
    id: "cognitive" as const,
    labelEn: "Cognitive & Focus",
    labelAr: "الإدراك والتركيز",
  },
];

export const productFormats = [
  { id: "all" as const, labelEn: "All", labelAr: "الكل" },
  { id: "vial" as const, labelEn: "Vials", labelAr: "قوارير" },
  { id: "pen" as const, labelEn: "Pens", labelAr: "أقلام" },
  { id: "spray" as const, labelEn: "Sprays", labelAr: "بخاخات" },
];

export const trustBadges = [
  {
    id: "purity",
    labelEn: "Lab-tested ≥99%",
    labelAr: "مختبر بنقاء ≥99%",
    descriptionEn: "Third-party verified purity",
    descriptionAr: "نقاء موثق من طرف ثالث",
  },
  {
    id: "coa",
    labelEn: "COA every peptide",
    labelAr: "شهادة تحليل لكل ببتيد",
    descriptionEn: "Certificate of analysis included",
    descriptionAr: "شهادة تحليل مرفقة",
  },
  {
    id: "cold-chain",
    labelEn: "Cold-chain GCC",
    labelAr: "سلسلة تبريد لدول الخليج",
    descriptionEn: "Temperature-controlled delivery",
    descriptionAr: "توصيل بدرجة حرارة مضبوطة",
  },
  {
    id: "checkout",
    labelEn: "Secure checkout",
    labelAr: "دفع آمن",
    descriptionEn: "Encrypted payment processing",
    descriptionAr: "معالجة دفع مشفرة",
  },
];

export const products: Product[] = [
  {
    id: "bac-water",
    nameEn: "Bacteriostatic Water",
    nameAr: "ماء بكتريوستاتيك",
    sizeEn: "11 ML",
    sizeAr: "11 مل",
    priceAed: 99,
    rating: 5,
    reviewCount: 128,
    categories: ["recovery"],
    format: "vial",
  },
  {
    id: "glp3-reta",
    nameEn: "GLP-3 (Reta)",
    nameAr: "GLP-3 (Reta)",
    sizeEn: "10 / 30 MG",
    sizeAr: "10 / 30 مجم",
    priceAed: 390,
    priceFrom: true,
    rating: 5,
    reviewCount: 86,
    categories: ["metabolic"],
    format: "vial",
  },
  {
    id: "glp3-reta-pen",
    nameEn: "GLP-3 (Reta) Pen",
    nameAr: "قلم GLP-3 (Reta)",
    sizeEn: "10 MG",
    sizeAr: "10 مجم",
    priceAed: 450,
    priceFrom: true,
    rating: 5,
    reviewCount: 42,
    categories: ["metabolic"],
    format: "pen",
  },
  {
    id: "ghk-cu",
    nameEn: "GHK-CU",
    nameAr: "GHK-CU",
    sizeEn: "50 MG",
    sizeAr: "50 مجم",
    priceAed: 320,
    rating: 5,
    reviewCount: 64,
    categories: ["recovery", "longevity"],
    format: "vial",
  },
  {
    id: "mots-c",
    nameEn: "MOTS-C",
    nameAr: "MOTS-C",
    sizeEn: "10 MG",
    sizeAr: "10 مجم",
    priceAed: 280,
    rating: 5,
    reviewCount: 51,
    categories: ["longevity", "metabolic"],
    format: "vial",
  },
  {
    id: "ipamorelin",
    nameEn: "Ipamorelin",
    nameAr: "إيباموريلين",
    sizeEn: "5 MG",
    sizeAr: "5 مجم",
    priceAed: 240,
    rating: 5,
    reviewCount: 73,
    categories: ["recovery", "cognitive"],
    format: "vial",
  },
];

export function getCategoryCount(
  categoryId: (typeof productCategories)[number]["id"],
  formatFilter: (typeof productFormats)[number]["id"] = "all"
) {
  const byFormat =
    formatFilter === "all"
      ? products
      : products.filter((product) => product.format === formatFilter);

  if (categoryId === "all") {
    return byFormat.length;
  }

  return byFormat.filter((product) => product.categories.includes(categoryId))
    .length;
}

export function filterProducts(
  categoryId: (typeof productCategories)[number]["id"],
  formatId: (typeof productFormats)[number]["id"]
) {
  return products.filter((product) => {
    const matchesCategory =
      categoryId === "all" || product.categories.includes(categoryId);
    const matchesFormat = formatId === "all" || product.format === formatId;
    return matchesCategory && matchesFormat;
  });
}
