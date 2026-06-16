import { Code, ExternalLink } from "lucide-react";
import { PublicPage } from "@/components/layouts/PublicPage";
import { BackButton } from "@/components/ui/BackButton";
import { getServerLanguage } from "@/lib/language.server";
import { t } from "@/lib/i18n";

export async function LabGithub() {
  const language = await getServerLanguage();

  return (
    <PublicPage>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <BackButton label={t(language, "Back", "رجوع")} />
          <h1 className="text-4xl md:text-5xl font-light">
            {t(language, "Our GitHub", "GitHub الخاص بنا")}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t(
              language,
              "Open source code repositories and tools from SNP Lab",
              "مستودعات الأكواد والأدوات مفتوحة المصدر من مختبر SNP"
            )}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Code className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-light mb-4">
              {t(language, "Our GitHub", "GitHub الخاص بنا")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              {t(
                language,
                "Check out our open source tools and code on GitHub.",
                "اطلع على أدواتنا وأكوادنا المفتوحة المصدر على GitHub."
              )}
            </p>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Code className="w-4 h-4" />
              {t(language, "Visit GitHub", "زيارة GitHub")}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
