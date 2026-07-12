import { PublicPage } from "@/components/layouts/PublicPage";
import { TeamMemberCard } from "@/components/about/TeamMemberCard";
import { getServerLanguage } from "@/lib/language.server";
import { t } from "@/lib/i18n";
import {
  aboutQuote,
  peopleSection,
  teamMembers,
} from "@/shared/about-content";
import {
  buildAboutBreadcrumbJsonLd,
  buildAboutJsonLd,
} from "@/lib/seo/about-metadata";
import { ScribbleUnderline } from "@/components/ui/Scribbles";

export async function AboutUs() {
  const language = await getServerLanguage();
  const jsonLd = buildAboutJsonLd();
  const breadcrumbJsonLd = buildAboutBreadcrumbJsonLd();

  return (
    <PublicPage>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero Quote */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 lg:pt-32 lg:pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1
            className={`text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-normal leading-relaxed md:leading-relaxed text-foreground tracking-tight ${
              language === "ar" ? "font-arabic-serif" : "font-serif-display"
            }`}
          >
            {language === "en" ? (
              <>
                “Research on Natural Science. At SNP, we are dedicated to advancing genomics through{" "}
                <ScribbleUnderline>open research</ScribbleUnderline> and rigorous data. We believe in open science, global collaboration, and providing researchers with the tools they need to decode the fundamental building blocks of life.”
              </>
            ) : (
              <>
                “{aboutQuote.textAr}”
              </>
            )}
          </h1>
        </div>
      </section>

      {/* Our People List */}
      <section className="pb-24 lg:pb-32" aria-labelledby="our-people-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-4">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                language={language}
              />
            ))}
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
