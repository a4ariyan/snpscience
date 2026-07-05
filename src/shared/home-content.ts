import { BookOpen, Dna, FlaskConical, HeartPulse, Monitor } from "lucide-react";

export const HERO_IMAGE = "/images/natural_science.avif";

export const HERO_IMAGE_WIDTH = 1280;
export const HERO_IMAGE_HEIGHT = 683;

export const mainSections = [
  {
    title: "Our Library",
    titleAr: "مكتبة SNP",
    description:
      "Population genomics, human health, and SNP research data",
    descriptionAr:
      "علم الجينوم السكاني والصحة البشرية وبيانات أبحاث SNP",
    path: "/library",
    icon: BookOpen,
  },
  {
    title: "Our Lab",
    titleAr: "مختبر SNP",
    description: "Our studies, open-source tools, and project explanations",
    descriptionAr: "دراساتنا وأدواتنا مفتوحة المصدر وشروحات المشاريع",
    path: "/lab",
    icon: Monitor,
  },
  {
    title: "Our Products",
    titleAr: "منتجاتنا",
    description: "Peptides for research. Purity, quality, and clear specs.",
    descriptionAr: "ببتيدات للأبحاث. نقاء وجودة ومواصفات واضحة.",
    path: "/products",
    icon: FlaskConical,
  },
];

export const librarySections = [
  {
    title: "Population Genomics",
    titleAr: "علم الجينوم السكاني",
    description: "GWAS, allele frequencies, phylogenetics, and more",
    descriptionAr: "دراسات GWAS وترددات الأليلات والتطور والمزيد",
    path: "/library/population-genomics",
    icon: Dna,
  },
  {
    title: "Human Health",
    titleAr: "الصحة البشرية",
    description: "Disease risk, pharmacogenomics, cancer genomics",
    descriptionAr: "خطر المرض وعلم الجينوم الدوائي وجينوم السرطان",
    path: "/library/human-health",
    icon: HeartPulse,
  },
];
