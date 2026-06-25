import { BookOpen, Dna, HeartPulse, Monitor } from "lucide-react";

export const HERO_IMAGE = "/images/natural_science.avif";

export const mainSections = [
  {
    title: "Our Library",
    titleAr: "مكتبة SNP",
    description:
      "Population genomics, human health, and comprehensive SNP research data",
    descriptionAr:
      "علم الجينوم السكاني والصحة البشرية وبيانات أبحاث SNP الشاملة",
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
