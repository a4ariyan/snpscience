import { Play, Users } from "lucide-react";
import { PublicPage } from "@/components/layouts/PublicPage";
import { BackButton } from "@/components/ui/BackButton";
import { getServerLanguage } from "@/lib/language.server";
import { t } from "@/lib/i18n";

export async function LabProjects() {
  const language = await getServerLanguage();

  return (
    <PublicPage>
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <BackButton label={t(language, "Back", "رجوع")} />
          <h1 className="text-4xl md:text-5xl font-light">
            {t(language, "Projects", "المشاريع")}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {t(
              language,
              "Explanation of studies in the libraries in video formats",
              "شرح الدراسات في المكتبات بصيغة فيديو"
            )}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center text-center max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Play className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-light mb-4">
              {t(language, "Coming Soon", "قريباً")}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {t(
                language,
                "We're producing video content explaining studies in our libraries. This section requires collaboration with the owner or product owner.",
                "نعمل على إنتاج محتوى فيديو يشرح الدراسات في مكتباتنا. يتطلب هذا القسم التعاون مع المالك أو صاحب المنتج."
              )}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-lg">
              <Users className="w-4 h-4" />
              {t(language, "Collaboration needed", "بحاجة للتعاون")}
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
