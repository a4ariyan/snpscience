"use client";

import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, Play, Users } from "lucide-react";

export function LabProjects() {
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
              {isArabic ? "المشاريع" : "Projects"}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {isArabic
                ? "شرح الدراسات في المكتبات بصيغة فيديو"
                : "Explanation of studies in the libraries in video formats"}
            </p>
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center text-center max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Play className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-light mb-4">
                {isArabic ? "قريباً" : "Coming Soon"}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {isArabic
                  ? "نعمل على إنتاج محتوى فيديو يشرح الدراسات في مكتباتنا. يتطلب هذا القسم التعاون مع المالك أو صاحب المنتج."
                  : "We're producing video content explaining studies in our libraries. This section requires collaboration with the owner or product owner."}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-lg">
                <Users className="w-4 h-4" />
                {isArabic ? "بحاجة للتعاون" : "Collaboration needed"}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
