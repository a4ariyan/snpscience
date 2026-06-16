import { PublicPage } from "@/components/layouts/PublicPage";
import { BackButton } from "@/components/ui/BackButton";
import { getServerLanguage } from "@/lib/language.server";
import { t } from "@/lib/i18n";

const subcategories = [
  { en: "Disease Risk Variants", ar: "متغيرات خطر المرض", slug: "disease-risk" },
  { en: "Pharmacogenomics", ar: "علم الجينوم الدوائي", slug: "pharmacogenomics" },
  { en: "Cancer Genomics", ar: "جينوم السرطان", slug: "cancer-genomics" },
  { en: "Rare Diseases", ar: "الأمراض النادرة", slug: "rare-diseases" },
  { en: "Cardiovascular Genetics", ar: "الوراثة القلبية", slug: "cardiovascular" },
  { en: "Neurogenomics", ar: "علم الجينوم العصبي", slug: "neurogenomics" },
  { en: "Immunogenomics", ar: "علم الجينوم المناعي", slug: "immunogenomics" },
  { en: "Nutrigenomics", ar: "علم التغذية الجينومي", slug: "nutrigenomics" },
];

export async function HumanHealth() {
  const language = await getServerLanguage();

  return (
    <PublicPage>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <BackButton label={t(language, "Back", "رجوع")} />
          <h1 className="text-4xl md:text-5xl font-light">
            {t(language, "Human Health", "الصحة البشرية")}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t(
              language,
              "SNP applications in medical research and clinical diagnostics",
              "تطبيقات SNP في البحث الطبي والتشخيص السريري"
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
