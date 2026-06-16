import { Loader2 } from "lucide-react";
import { PublicPage } from "@/components/layouts/PublicPage";
import { getServerLanguage } from "@/lib/language.server";
import { t } from "@/lib/i18n";

export async function History() {
  const language = await getServerLanguage();

  return (
    <PublicPage>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl font-light">
            {t(language, "History", "التاريخ")}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t(
              language,
              "Exploring genetic and evolutionary history through SNP data",
              "استكشاف التاريخ الجيني والتطوري من خلال بيانات SNP"
            )}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
            <h2 className="text-3xl font-light mb-4">
              {t(language, "Loading...", "جاري التحميل...")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t(
                language,
                "We're preparing the content for this section. Please wait or check back later.",
                "نعمل على تجهيز محتوى هذا القسم. يرجى الانتظار أو العودة لاحقاً."
              )}
            </p>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
