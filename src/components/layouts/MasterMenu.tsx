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
    history: "History",
    snpLab: "SNP Lab",
    ourStudies: "Our Studies",
    ourGithub: "Our GitHub",
    projects: "Projects",
  },
  ar: {
    navigation: "التنقل",
    snpLibrary: "مكتبة SNP",
    populationGenomics: "علم الجينوم السكاني",
    humanHealth: "الصحة البشرية",
    history: "التاريخ",
    snpLab: "مختبر SNP",
    ourStudies: "دراساتنا",
    ourGithub: "GitHub الخاص بنا",
    projects: "المشاريع",
  },
};

const libraryLinks = [
  { key: "population-genomics", path: "/library/population-genomics", labelKey: "populationGenomics" as const },
  { key: "human-health", path: "/library/human-health", labelKey: "humanHealth" as const },
  { key: "history", path: "/library/history", labelKey: "history" as const },
];

export function MasterMenu({ isOpen, onClose }: MasterMenuProps) {
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [labOpen, setLabOpen] = useState(false);
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
                  libraryOpen ? "max-h-48 mt-1" : "max-h-0"
                }`}
              >
                <div className={`${isRTL ? "mr-4" : "ml-4"} space-y-1`}>
                  {libraryLinks.map((link) => (
                    <button
                      key={link.key}
                      onClick={() => handleNav(link.path)}
                      className={`w-full text-left block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        isActive(link.path)
                          ? "bg-accent text-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                    >
                      {t[link.labelKey]}
                    </button>
                  ))}
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
                onClick={() => setLabOpen(!labOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 text-base rounded-lg transition-colors ${
                  isPathActive("/lab")
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                }`}
              >
                <span>{t.snpLab}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    labOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ${
                  labOpen ? "max-h-48 mt-1" : "max-h-0"
                }`}
              >
                <div className={`${isRTL ? "mr-4" : "ml-4"} space-y-1`}>
                  <button
                    onClick={() => handleNav("/lab/studies")}
                    className={`w-full text-left block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                      isActive("/lab/studies")
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {t.ourStudies}
                  </button>
                  <button
                    onClick={() => handleNav("/lab/github")}
                    className={`w-full text-left block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                      isActive("/lab/github")
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {t.ourGithub}
                  </button>
                  <button
                    onClick={() => handleNav("/lab/projects")}
                    className={`w-full text-left block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                      isActive("/lab/projects")
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {t.projects}
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
