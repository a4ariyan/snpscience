"use client";

import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, FlaskConical } from "lucide-react";

export function LabStudies() {
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
              {isArabic ? "دراساتنا" : "Our Studies"}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {isArabic
                ? "أبحاثنا ودراساتنا في مختبر SNP"
                : "Research and studies from the SNP Lab"}
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <FlaskConical className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-light mb-4">
                {isArabic ? "قريباً" : "Coming Soon"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isArabic
                  ? "نعمل على نشر دراساتنا وأبحاثنا. ترقبوا التحديثات."
                  : "We're working on publishing our research and studies. Stay tuned."}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
