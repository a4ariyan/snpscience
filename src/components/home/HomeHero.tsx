import { getServerLanguage } from "@/lib/language.server";
import { t } from "@/lib/i18n";
import { HERO_IMAGE, HERO_IMAGE_HEIGHT, HERO_IMAGE_WIDTH } from "@/shared/home-content";

export async function HomeHero() {
  const language = await getServerLanguage();

  return (
    <section
      className="relative mt-16 w-full overflow-hidden bg-[#f3f3f1] text-[#1a3a30]"
      style={{
        height: `clamp(420px, calc(100vw * ${HERO_IMAGE_HEIGHT} / ${HERO_IMAGE_WIDTH}), min(60vh, 600px))`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('${HERO_IMAGE}')`,
          backgroundSize: "100% auto",
        }}
      />

      <div className="absolute inset-0 z-10 flex items-center justify-center text-center px-6">
        <div className="max-w-2xl">
          <h1
            className={`${language === "ar" ? "font-arabic-serif" : "font-serif-display"} text-5xl sm:text-6xl lg:text-[5.5rem] font-normal leading-[0.95] tracking-tight`}
          >
            SNP
          </h1>
          <p
            className={`${language === "ar" ? "font-arabic-serif" : "font-serif-display"} mt-5 text-xl sm:text-2xl lg:text-[1.65rem] font-normal leading-snug text-[#1a3a30]/90`}
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
