"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className={isArabic ? "text-right" : "text-left"}>
            <h3 className="text-xl font-semibold mb-3 tracking-wide">SNP</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              {isArabic
                ? "استكشاف تعدد أشكال النوكليوتيدات المفردة وعلم الجينوم"
                : "Exploring Single Nucleotide Polymorphisms & Genomics through research and open-source projects."}
            </p>
          </div>

          <div className={isArabic ? "text-right" : "text-left"}>
            <h4 className="text-sm font-medium mb-4 tracking-wide">
              {isArabic ? "المكتبة" : "Library"}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/library/population-genomics"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isArabic ? "علم الجينوم السكاني" : "Population Genomics"}
                </Link>
              </li>
              <li>
                <Link
                  href="/library/human-health"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isArabic ? "الصحة البشرية" : "Human Health"}
                </Link>
              </li>
              <li>
                <Link
                  href="/library/history"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isArabic ? "التاريخ" : "History"}
                </Link>
              </li>
            </ul>
          </div>

          <div className={isArabic ? "text-right" : "text-left"}>
            <h4 className="text-sm font-medium mb-4 tracking-wide">
              {isArabic ? "المختبر" : "Lab"}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/lab/studies"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isArabic ? "دراساتنا" : "Our Studies"}
                </Link>
              </li>
              <li>
                <Link
                  href="/lab/github"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isArabic ? "GitHub الخاص بنا" : "Our GitHub"}
                </Link>
              </li>
              <li>
                <Link
                  href="/lab/projects"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isArabic ? "المشاريع" : "Projects"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} SNP. {isArabic ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
