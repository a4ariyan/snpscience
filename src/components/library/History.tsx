"use client";

import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";

export function History() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-4xl md:text-5xl font-light">
              {isArabic ? "التاريخ" : "History"}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {isArabic
                ? "استكشاف التاريخ الجيني والتطوري من خلال بيانات SNP"
                : "Exploring genetic and evolutionary history through SNP data"}
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
              <h2 className="text-3xl font-light mb-4">
                {isArabic ? "جاري التحميل..." : "Loading..."}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isArabic
                  ? "نعمل على تجهيز محتوى هذا القسم. يرجى الانتظار أو العودة لاحقاً."
                  : "We're preparing the content for this section. Please wait or check back later."}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
