import { FileText, Lock, Shield, Truck } from "lucide-react";
import type { Language } from "@/shared/language";
import { t } from "@/lib/i18n";
import { trustBadges } from "@/shared/products-content";

const badgeIcons = {
  purity: Shield,
  coa: FileText,
  "cold-chain": Truck,
  checkout: Lock,
} as const;

interface ProductsHeroProps {
  language: Language;
}

export function ProductsHero({ language }: ProductsHeroProps) {
  return (
    <section className="bg-background border-b border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="max-w-3xl">
          <p className="mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            <span className="h-px w-8 bg-primary" />
            {t(
              language,
              "Research peptides • UAE & GCC",
              "ببتيدات بحثية • الإمارات ودول الخليج"
            )}
          </p>
          <h1 className="text-4xl font-light tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {t(language, "UAE Research Peptides", "ببتيدات بحثية في الإمارات")}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t(
              language,
              "SNP Science peptides for the UAE and GCC. 99%+ purity, COA on every order, cold-chain delivery.",
              "ببتيدات SNP Science في الإمارات ودول الخليج. نقاء 99%+، شهادة تحليل مع كل طلب، وتوصيل عبر سلسلة تبريد."
            )}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10 border-t border-border pt-12">
          {trustBadges.map((badge) => {
            const Icon = badgeIcons[badge.id as keyof typeof badgeIcons];
            return (
              <div key={badge.id} className="flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t(language, badge.labelEn, badge.labelAr)}
                  </p>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {t(language, badge.descriptionEn, badge.descriptionAr)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
