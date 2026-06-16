import { FlaskConical } from "lucide-react";
import { PublicPage } from "@/components/layouts/PublicPage";
import { BackButton } from "@/components/ui/BackButton";
import { getServerLanguage } from "@/lib/language.server";
import { t } from "@/lib/i18n";

export async function LabStudies() {
  const language = await getServerLanguage();

  return (
    <PublicPage>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <BackButton label={t(language, "Back", "رجوع")} />
          <h1 className="text-4xl md:text-5xl font-light">
            {t(language, "Our Studies", "دراساتنا")}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t(
              language,
              "Research and studies from the SNP Lab",
              "أبحاثنا ودراساتنا في مختبر SNP"
            )}
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
              {t(language, "Coming Soon", "قريباً")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t(
                language,
                "We're working on publishing our research and studies. Stay tuned.",
                "نعمل على نشر دراساتنا وأبحاثنا. ترقبوا التحديثات."
              )}
            </p>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
