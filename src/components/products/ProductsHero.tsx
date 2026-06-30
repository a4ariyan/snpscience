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
    <section className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 md:px-10 md:py-14 shadow-sm">
          {/* Subtle background pattern for visual interest without breaking contrast */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative max-w-2xl">
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              <span className="h-px w-8 bg-primary/40" />
              {t(
                language,
                "Research peptides • UAE & GCC",
                "ببتيدات بحثية • الإمارات ودول الخليج"
              )}
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {t(language, "Research Peptides", "ببتيدات بحثية")}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t(
                language,
                "High-purity research peptides with ≥99% purity, COA provided, and cold-chain delivery across the UAE and GCC.",
                "ببتيدات بحثية عالية النقاء بنسبة ≥99%، مع شهادات تحليل وتوصيل عبر سلسلة تبريد في الإمارات ودول الخليج."
              )}
            </p>
          </div>

          <div className="relative mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4 md:gap-6 pt-8 border-t border-border/50">
            {trustBadges.map((badge) => {
              const Icon = badgeIcons[badge.id as keyof typeof badgeIcons];
              return (
                <div key={badge.id} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-muted text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm font-semibold text-foreground">
                      {t(language, badge.labelEn, badge.labelAr)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                      {t(language, badge.descriptionEn, badge.descriptionAr)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
