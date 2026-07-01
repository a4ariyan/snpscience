import { getServerLanguage } from "@/lib/language.server";
import { t } from "@/lib/i18n";
import { HERO_IMAGE } from "@/shared/home-content";

export async function HomeHero() {
  const language = await getServerLanguage();

  return (
    <section
      className="relative mt-20 w-full overflow-hidden bg-[#f3f3f1] text-[#1a3a30] h-[calc(100vw*683/1280)] max-h-[50vh] min-h-[200px] md:min-h-[420px] md:max-h-[min(60vh,600px)] md:h-[clamp(420px,calc(100vw*683/1280),min(60vh,600px))]"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:[background-size:100%_auto]"
        style={{
          backgroundImage: `url('${HERO_IMAGE}')`,
        }}
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-4 sm:px-6">
        <div className="max-w-2xl">
          <h1
            className={`${language === "ar" ? "font-arabic-serif" : "font-serif-display"} text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-normal leading-[0.95] tracking-tight`}
          >
            SNP
          </h1>
          <p
            className={`${language === "ar" ? "font-arabic-serif" : "font-serif-display"} mt-2 sm:mt-4 md:mt-5 text-base sm:text-xl md:text-2xl lg:text-[1.65rem] font-normal leading-snug text-[#1a3a30]/90`}
          >
            {t(
              language,
              "Research on Natural Science",
              "استكشاف تعدد أشكال النوكليوتيدات المفردة وعلم الجينوم"
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
