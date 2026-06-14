"use client";

import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";

const subcategories = [
  { en: "Disease Risk Variants", ar: "متغيرات خطر المرض", slug: "disease-risk" },
  { en: "Pharmacogenomics", ar: "علم الجينوم الدوائي", slug: "pharmacogenomics" },
  { en: "Cancer Genomics", ar: "جينوم السرطان", slug: "cancer-genomics" },
  { en: "Rare Diseases", ar: "الأمراض النادرة", slug: "rare-diseases" },
  { en: "Cardiovascular Genetics", ar: "الوراثة القلبية", slug: "cardiovascular" },
  { en: "Neurogenomics", ar: "علم الجينوم العصبي", slug: "neurogenomics" },
  { en: "Immunogenomics", ar: "علم الجينوم المناعي", slug: "immunogenomics" },
  { en: "Nutrigenomics", ar: "علم التغذية الجينومي", slug: "nutrigenomics" },
];

export function HumanHealth() {
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
              {isArabic ? "الصحة البشرية" : "Human Health"}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {isArabic
                ? "تطبيقات SNP في البحث الطبي والتشخيص السريري"
                : "SNP applications in medical research and clinical diagnostics"}
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
