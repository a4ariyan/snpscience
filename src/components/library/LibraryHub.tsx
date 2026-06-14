"use client";

import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { Dna, HeartPulse, Clock } from "lucide-react";

const categories = [
  {
    title: "Population Genomics",
    titleAr: "علم الجينوم السكاني",
    description: "Explore SNP data across populations, allele frequencies, phylogenetics, and migration patterns.",
    descriptionAr: "استكشف بيانات SNP عبر السكان وترددات الأليلات والتطور وأنماط الهجرة.",
    path: "/library/population-genomics",
    icon: Dna,
  },
  {
    title: "Human Health",
    titleAr: "الصحة البشرية",
    description: "Disease risk variants, pharmacogenomics, cancer genomics, and clinical applications of SNP research.",
    descriptionAr: "متغيرات خطر المرض وعلم الجينوم الدوائي وجينوم السرطان والتطبيقات السريرية لأبحاث SNP.",
    path: "/library/human-health",
    icon: HeartPulse,
  },
  {
    title: "History",
    titleAr: "التاريخ",
    description: "Exploring genetic and evolutionary history through SNP data.",
    descriptionAr: "استكشاف التاريخ الجيني والتطوري من خلال بيانات SNP.",
    path: "/library/history",
    icon: Clock,
  },
];

export function LibraryHub() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-4xl md:text-5xl font-light">
              {isArabic ? "مكتبة SNP" : "SNP Library"}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {isArabic
                ? "مجموعة شاملة من أبحاث وبيانات تعدد أشكال النوكليوتيدات المفردة"
                : "A comprehensive collection of Single Nucleotide Polymorphism research and data"}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Link key={cat.path} href={cat.path}>
                    <div className="group text-left p-8 rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer">
                      <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                      <h2 className="text-2xl font-light mb-2 group-hover:text-primary transition-colors">
                        {isArabic ? cat.titleAr : cat.title}
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {isArabic ? cat.descriptionAr : cat.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
