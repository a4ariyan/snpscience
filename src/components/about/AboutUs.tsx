import { PublicPage } from "@/components/layouts/PublicPage";
import { TeamMemberCard } from "@/components/about/TeamMemberCard";
import { getServerLanguage } from "@/lib/language.server";
import {
  aboutQuote,
  teamMembers,
} from "@/shared/about-content";
import {
  buildAboutBreadcrumbJsonLd,
  buildAboutJsonLd,
} from "@/lib/seo/about-metadata";
import { AboutHeroQuote } from "@/components/about/AboutHeroQuote";

interface AboutUsProps {
  highlightedMemberId?: string;
}

export async function AboutUs({ highlightedMemberId }: AboutUsProps) {
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

      <AboutHeroQuote language={language} quoteAr={aboutQuote.textAr} />

      {/* Our People List */}
      <section className="pb-24 lg:pb-32" aria-labelledby="our-people-heading">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-4 items-start">
            {teamMembers.map((member) => (
              <TeamMemberCard
                key={member.id}
                member={member}
                language={language}
                isHighlighted={highlightedMemberId === member.id}
              />
            ))}
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
