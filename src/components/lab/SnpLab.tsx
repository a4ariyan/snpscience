"use client";

import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";
import { FlaskConical, Code, Play } from "lucide-react";

const categories = [
  {
    title: "Our Studies",
    titleAr: "دراساتنا",
    description: "Research and studies from the SNP Lab",
    descriptionAr: "أبحاثنا ودراساتنا في مختبر SNP",
    path: "/lab/studies",
    icon: FlaskConical,
  },
  {
    title: "Our GitHub",
    titleAr: "GitHub الخاص بنا",
    description: "Open source code repositories and tools from SNP Lab",
    descriptionAr: "مستودعات الأكواد والأدوات مفتوحة المصدر من مختبر SNP",
    path: "/lab/github",
    icon: Code,
  },
  {
    title: "Projects",
    titleAr: "المشاريع",
    description: "Explanation of studies in the libraries in video formats",
    descriptionAr: "شرح الدراسات في المكتبات بصيغة فيديو",
    path: "/lab/projects",
    icon: Play,
  },
];

export function SnpLab() {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <section className="border-b border-border">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <h1 className="text-4xl md:text-5xl font-light">
              {isArabic ? "مختبر SNP" : "SNP Lab"}
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              {isArabic
                ? "دراساتنا وأدواتنا مفتوحة المصدر وشروحات المشاريع"
                : "Our studies, open-source tools, and project explanations"}
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
                    <div className="group text-left p-8 rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer h-full">
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
