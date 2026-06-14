"use client";

import { X, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MasterMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const translations = {
  en: {
    navigation: "Navigation",
    snpLibrary: "SNP Library",
    populationGenomics: "Population Genomics",
    humanHealth: "Human Health",
    snpLab: "SNP Lab",
  },
  ar: {
    navigation: "التنقل",
    snpLibrary: "مكتبة SNP",
    populationGenomics: "علم الجينوم السكاني",
    humanHealth: "الصحة البشرية",
    snpLab: "مختبر SNP",
  },
};

const populationGenomicsSubcategories = [
  { key: "gwas", en: "GWAS Studies", ar: "دراسات GWAS", path: "/library/population-genomics/gwas" },
  { key: "allele-freq", en: "Allele Frequencies", ar: "ترددات الأليلات", path: "/library/population-genomics/allele-frequencies" },
  { key: "phylogenetics", en: "Phylogenetics", ar: "علم التطور", path: "/library/population-genomics/phylogenetics" },
  { key: "population-structure", en: "Population Structure", ar: "بنية السكان", path: "/library/population-genomics/population-structure" },
  { key: "natural-selection", en: "Natural Selection", ar: "الانتقاء الطبيعي", path: "/library/population-genomics/natural-selection" },
  { key: "genetic-drift", en: "Genetic Drift", ar: "الانجراف الوراثي", path: "/library/population-genomics/genetic-drift" },
  { key: "migration-patterns", en: "Migration Patterns", ar: "أنماط الهجرة", path: "/library/population-genomics/migration-patterns" },
  { key: "ancient-dna", en: "Ancient DNA", ar: "الحمض النووي القديم", path: "/library/population-genomics/ancient-dna" },
];

const humanHealthSubcategories = [
  { key: "disease-risk", en: "Disease Risk Variants", ar: "متغيرات خطر المرض", path: "/library/human-health/disease-risk" },
  { key: "pharmacogenomics", en: "Pharmacogenomics", ar: "علم الجينوم الدوائي", path: "/library/human-health/pharmacogenomics" },
  { key: "cancer-genomics", en: "Cancer Genomics", ar: "جينوم السرطان", path: "/library/human-health/cancer-genomics" },
  { key: "rare-diseases", en: "Rare Diseases", ar: "الأمراض النادرة", path: "/library/human-health/rare-diseases" },
  { key: "cardiovascular", en: "Cardiovascular Genetics", ar: "الوراثة القلبية", path: "/library/human-health/cardiovascular" },
  { key: "neurogenomics", en: "Neurogenomics", ar: "علم الجينوم العصبي", path: "/library/human-health/neurogenomics" },
  { key: "immunogenomics", en: "Immunogenomics", ar: "علم الجينوم المناعي", path: "/library/human-health/immunogenomics" },
  { key: "nutrigenomics", en: "Nutrigenomics", ar: "علم التغذية الجينومي", path: "/library/human-health/nutrigenomics" },
];

export function MasterMenu({ isOpen, onClose }: MasterMenuProps) {
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [popGenOpen, setPopGenOpen] = useState(false);
  const [humanHealthOpen, setHumanHealthOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { language } = useLanguage();
  const t = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isActive = (path: string) => pathname === path;
  const isPathActive = (prefix: string) => pathname.startsWith(prefix);

  const handleNav = (path: string) => {
    onClose();
    router.push(path);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      <div
        className={`fixed inset-y-0 ${isRTL ? "left-0" : "right-0"} w-full max-w-sm bg-background border-${isRTL ? "r" : "l"} border-border shadow-2xl z-50 overflow-y-auto`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="flex items-center justify-between p-5 border-b border-border bg-muted/50">
          <h2 className="text-xl font-medium">{t.navigation}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-8">
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3">
              {t.snpLibrary}
            </h3>
            <nav className="space-y-1">
              <button
                onClick={() => setLibraryOpen(!libraryOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 text-base rounded-lg transition-colors ${
                  isPathActive("/library")
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                <span>{t.snpLibrary}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    libraryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  libraryOpen ? "max-h-[2000px] mt-1" : "max-h-0"
                }`}
              >
                <div className={`${isRTL ? "mr-4" : "ml-4"} space-y-1`}>
                  <div>
                    <button
                      onClick={() => setPopGenOpen(!popGenOpen)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        isPathActive("/library/population-genomics")
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                    >
                      <span>{t.populationGenomics}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          popGenOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        popGenOpen ? "max-h-[800px] mt-1" : "max-h-0"
                      }`}
                    >
                      <div className={`${isRTL ? "mr-4" : "ml-4"} space-y-0.5`}>
                        <button
                          onClick={() => handleNav("/library/population-genomics")}
                          className={`w-full text-left block px-4 py-2 text-xs rounded-lg transition-colors ${
                            isActive("/library/population-genomics")
                              ? "bg-accent/80 text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                          }`}
                        >
                          {language === "en" ? "All Topics" : "جميع المواضيع"}
                        </button>
                        {populationGenomicsSubcategories.map((sub) => (
                          <button
                            key={sub.key}
                            onClick={() => handleNav(sub.path)}
                            className={`w-full text-left block px-4 py-2 text-xs rounded-lg transition-colors ${
                              isActive(sub.path)
                                ? "bg-accent/80 text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                            }`}
                          >
                            {language === "en" ? sub.en : sub.ar}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      onClick={() => setHumanHealthOpen(!humanHealthOpen)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        isPathActive("/library/human-health")
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                    >
                      <span>{t.humanHealth}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          humanHealthOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        humanHealthOpen ? "max-h-[800px] mt-1" : "max-h-0"
                      }`}
                    >
                      <div className={`${isRTL ? "mr-4" : "ml-4"} space-y-0.5`}>
                        <button
                          onClick={() => handleNav("/library/human-health")}
                          className={`w-full text-left block px-4 py-2 text-xs rounded-lg transition-colors ${
                            isActive("/library/human-health")
                              ? "bg-accent/80 text-foreground font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                          }`}
                        >
                          {language === "en" ? "All Topics" : "جميع المواضيع"}
                        </button>
                        {humanHealthSubcategories.map((sub) => (
                          <button
                            key={sub.key}
                            onClick={() => handleNav(sub.path)}
                            className={`w-full text-left block px-4 py-2 text-xs rounded-lg transition-colors ${
                              isActive(sub.path)
                                ? "bg-accent/80 text-foreground font-medium"
                                : "text-muted-foreground hover:text-foreground hover:bg-accent/30"
                            }`}
                          >
                            {language === "en" ? sub.en : sub.ar}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3">
              {t.snpLab}
            </h3>
            <nav className="space-y-1">
              <button
                onClick={() => handleNav("/lab")}
                className={`w-full flex items-center justify-between px-4 py-3 text-base rounded-lg transition-colors ${
                  isPathActive("/lab")
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                <span>{t.snpLab}</span>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
