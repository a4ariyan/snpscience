import Link from "next/link";
import { Footer } from "@/components/layouts/Footer";
import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeHeroBackground } from "@/components/home/HomeHeroBackground";
import { getServerLanguage } from "@/lib/language.server";
import { t } from "@/lib/i18n";
import {
  heroImages,
  mainSections,
  librarySections,
} from "@/shared/home-content";

export async function Home() {
  const language = await getServerLanguage();
  const isRTL = language === "ar";
  const textAlign = isRTL ? "text-right" : "text-left";

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <HomeHeader />

      <section className="relative h-[50vh] md:h-[65vh] min-h-[400px] md:min-h-[500px] overflow-hidden mt-16">
        <HomeHeroBackground images={heroImages} />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-tight">
            SNP
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl">
            {t(
              language,
              "Research on Natural Science.",
              "استكشاف تعدد أشكال النوكليوتيدات المفردة وعلم الجينوم"
            )}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/50">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className={`mb-10 ${textAlign}`}>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-3 tracking-tight">
              {t(language, "Explore", "استكشف")}
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              {t(language, "Research library and lab", "مكتبة الأبحاث والمختبر")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.path} href={section.path} className="h-full">
                  <div className="group h-full text-left relative overflow-hidden rounded-xl border border-border bg-card p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-light mb-2 group-hover:text-primary transition-colors">
                      {t(language, section.title, section.titleAr)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(language, section.description, section.descriptionAr)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {librarySections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.path} href={section.path}>
                  <div className="group text-left p-6 rounded-xl border border-border bg-card hover:bg-accent/30 hover:border-primary/20 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">
                          {t(language, section.title, section.titleAr)}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {t(language, section.description, section.descriptionAr)}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6 tracking-tight">
              {t(language, "About SNP", "عن SNP")}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              {t(
                language,
                "SNP is dedicated to Single Nucleotide Polymorphism research. We provide a comprehensive library and a lab for research and open-source projects.",
                "SNP مكرسة لأبحاث تعدد أشكال النوكليوتيدات المفردة. نقدم مكتبة شاملة ومختبر للأبحاث والمشاريع المفتوحة المصدر."
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/library"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                {t(language, "Explore Library", "استكشف المكتبة")}
              </Link>
              <Link
                href="/lab/studies"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors text-sm font-medium"
              >
                {t(language, "Our Studies", "دراساتنا")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
