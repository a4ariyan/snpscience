import { PublicPage } from "@/components/layouts/PublicPage";
import { BackButton } from "@/components/ui/BackButton";
import { getServerLanguage } from "@/lib/language.server";
import { t } from "@/lib/i18n";

const subcategories = [
  { en: "GWAS Studies", ar: "دراسات GWAS", slug: "gwas" },
  { en: "Allele Frequencies", ar: "ترددات الأليلات", slug: "allele-frequencies" },
  { en: "Phylogenetics", ar: "علم التطور", slug: "phylogenetics" },
  { en: "Population Structure", ar: "بنية السكان", slug: "population-structure" },
  { en: "Natural Selection", ar: "الانتقاء الطبيعي", slug: "natural-selection" },
  { en: "Genetic Drift", ar: "الانجراف الوراثي", slug: "genetic-drift" },
  { en: "Migration Patterns", ar: "أنماط الهجرة", slug: "migration-patterns" },
  { en: "Ancient DNA", ar: "الحمض النووي القديم", slug: "ancient-dna" },
];

export async function PopulationGenomics() {
  const language = await getServerLanguage();

  return (
    <PublicPage>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <BackButton label={t(language, "Back", "رجوع")} />
          <h1 className="text-4xl md:text-5xl font-light">
            {t(language, "Population Genomics", "علم الجينوم السكاني")}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t(
              language,
              "Studying genetic variation across populations using SNP data",
              "دراسة التنوع الجيني عبر السكان باستخدام بيانات SNP"
            )}
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
                  {t(language, sub.en, sub.ar)}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t(language, "Coming soon - content pending", "قريباً - محتوى قادم")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
