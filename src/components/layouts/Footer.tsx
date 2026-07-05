import Link from "next/link";
import { getServerLanguage } from "@/lib/language.server";
import { t } from "@/lib/i18n";
import { FooterSettings } from "@/components/layouts/FooterSettings";

export async function Footer() {
  const language = await getServerLanguage();
  const rtl = language === "ar";
  const textAlign = rtl ? "text-right" : "text-left";
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className={`md:col-span-2 ${textAlign}`}>
            <h3 className="text-xl font-semibold mb-3 tracking-wide text-primary">SNP</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6">
              {t(
                language,
                "Research on Natural Science. SNP work on Single Nucleotide Polymorphisms and genomics.",
                "البحث في العلوم الطبيعية. عمل SNP في تعدد أشكال النوكليوتيدات المفردة وعلم الجينوم."
              )}
            </p>
            <FooterSettings />
          </div>

          <div className={textAlign}>
            <h4 className="text-sm font-semibold mb-4 tracking-wide text-foreground">
              {t(language, "Library", "المكتبة")}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/library/population-genomics"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(language, "Population Genomics", "علم الجينوم السكاني")}
                </Link>
              </li>
              <li>
                <Link
                  href="/library/human-health"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(language, "Human Health", "الصحة البشرية")}
                </Link>
              </li>
              <li>
                <Link
                  href="/library/history"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(language, "History", "التاريخ")}
                </Link>
              </li>
            </ul>
          </div>

          <div className={textAlign}>
            <h4 className="text-sm font-semibold mb-4 tracking-wide text-foreground">
              {t(language, "Lab", "المختبر")}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/lab/studies"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(language, "Our Studies", "دراساتنا")}
                </Link>
              </li>
              <li>
                <Link
                  href="/lab/github"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(language, "Our GitHub", "GitHub الخاص بنا")}
                </Link>
              </li>
              <li>
                <Link
                  href="/lab/projects"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t(language, "Projects", "المشاريع")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            © {currentYear} SNP. {t(language, "All rights reserved.", "جميع الحقوق محفوظة.")}
          </p>
        </div>
      </div>
    </footer>
  );
}
