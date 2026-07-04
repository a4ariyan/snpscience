export const PRODUCT_PLACEHOLDER_IMAGE = "/sample_product_image.png";

export type ProductCategoryId =
  | "recovery"
  | "metabolic"
  | "longevity"
  | "skin"
  | "cognitive"
  | "growth";

export type ProductFormatId = "vial" | "pen" | "spray";

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
    labelEn: "Longevity & Immune",
    labelAr: "طول العمر والمناعة",
  },
  {
    id: "skin" as const,
    labelEn: "Skin & Beauty",
    labelAr: "البشرة والجمال",
  },
  {
    id: "cognitive" as const,
    labelEn: "Cognitive & Neuro",
    labelAr: "الإدراك والأعصاب",
  },
  {
    id: "growth" as const,
    labelEn: "Growth & Body",
    labelAr: "النمو والجسم",
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

interface FilterableProduct {
  categories: string[];
  format: string;
}

export function getCategoryCount(
  categoryId: (typeof productCategories)[number]["id"],
  formatFilter: (typeof productFormats)[number]["id"] = "all",
  products: FilterableProduct[] = []
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
