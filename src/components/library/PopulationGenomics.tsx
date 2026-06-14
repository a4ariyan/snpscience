"use client";

import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";

const subcategories = [
  { en: "GWAS Studies", ar: "دراسات GWAS", slug: "gwas" },
  { en: "Allele Frequencies", ar: "ترددات الأليلات", slug: "allele-frequencies" },
  { en: "Phylogenetics", ar: "علم التطور", slug: "phylogenetics" },
  { en: "Population Structure", ar: "بنية السكان", slug: "population-structure" },
  { en: "Natural Selection", ar: "الانتقاء الطبيعي", slug: "natural-selection" },
  { en: "Genetic Drift", ar: "الانجراف الوراثي", slug: "genetic-drift" },
  { en: "Migration Patterns", ar: "أنماط الهجرة", slug: "migration-patterns" },
  { en: "Ancient DNA", ar: "الحمض النووي القديم", slug: "ancient-dna" },
];

export function PopulationGenomics() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <button
              onClick={() => window.history.back()}
              className="mb-6 flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 rtl:rotate-180" />
              {isArabic ? "رجوع" : "Back"}
            </button>
            <h1 className="text-4xl md:text-5xl font-light">
              {isArabic ? "علم الجينوم السكاني" : "Population Genomics"}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {isArabic
                ? "دراسة التنوع الجيني عبر السكان باستخدام بيانات SNP"
                : "Studying genetic variation across populations using SNP data"}
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {subcategories.map((sub) => (
                <div
                  key={sub.slug}
                  className="p-6 rounded-xl border border-border bg-card hover:bg-accent/30 transition-all duration-200"
                >
                  <h3 className="text-lg font-medium mb-2">
                    {isArabic ? sub.ar : sub.en}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isArabic ? "قريباً - محتوى قادم" : "Coming soon - content pending"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
