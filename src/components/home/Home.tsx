"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MasterMenu } from "@/components/layouts/MasterMenu";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Search, Moon, Sun, Menu, X, Globe, Dna, HeartPulse, BookOpen, Monitor } from "lucide-react";

const heroImages = [
  "/images/aerial-1.jpg",
  "/images/aerial-2.jpg",
  "/images/aerial-3.jpg",
];

const mainSections = [
  {
    title: "SNP Library",
    titleAr: "مكتبة SNP",
    description: "Population genomics, human health, and comprehensive SNP research data",
    descriptionAr: "علم الجينوم السكاني والصحة البشرية وبيانات أبحاث SNP الشاملة",
    path: "/library",
    icon: BookOpen,
  },
  {
    title: "SNP Lab",
    titleAr: "مختبر SNP",
    description: "Our studies, open-source tools, and project explanations",
    descriptionAr: "دراساتنا وأدواتنا مفتوحة المصدر وشروحات المشاريع",
    path: "/lab",
    icon: Monitor,
  },
];

const librarySections = [
  {
    title: "Population Genomics",
    titleAr: "علم الجينوم السكاني",
    description: "GWAS, allele frequencies, phylogenetics, and more",
    descriptionAr: "دراسات GWAS وترددات الأليلات والتطور والمزيد",
    path: "/library/population-genomics",
    icon: Dna,
  },
  {
    title: "Human Health",
    titleAr: "الصحة البشرية",
    description: "Disease risk, pharmacogenomics, cancer genomics",
    descriptionAr: "خطر المرض وعلم الجينوم الدوائي وجينوم السرطان",
    path: "/library/human-health",
    icon: HeartPulse,
  },
];

export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const isRTL = language === "ar";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en");

  return (
    <div className={`min-h-screen bg-background text-foreground ${isRTL ? "rtl" : "ltr"}`} dir={isRTL ? "rtl" : "ltr"}>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-background border-b border-border"
        }`}
      >
        <div className="h-full max-w-[1280px] mx-auto px-6 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-foreground tracking-wide">
              SNP
            </span>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors text-foreground"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="text-sm font-medium">{isRTL ? "القائمة" : "Menu"}</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              className="p-2.5 rounded-lg hover:bg-accent transition-colors text-foreground"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg hover:bg-accent transition-colors text-foreground"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-foreground text-sm font-medium"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              {isRTL ? "EN" : "عربي"}
            </button>
          </div>
        </div>
      </header>

      <MasterMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="relative h-[50vh] md:h-[65vh] min-h-[400px] md:min-h-[500px] overflow-hidden mt-16">
        {heroImages.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt="SNP research"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-4 tracking-tight">
            SNP
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl">
            {isRTL
              ? "استكشاف تعدد أشكال النوكليوتيدات المفردة وعلم الجينوم"
              : "Research on Natural Science."}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/50">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className={`mb-10 ${isRTL ? "text-right" : "text-left"}`}>
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-3 tracking-tight">
              {isRTL ? "استكشف" : "Explore"}
            </h2>
            <p className="text-muted-foreground text-base max-w-xl">
              {isRTL
                ? "مكتبة الأبحاث والمختبر"
                : "Research library and lab"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mainSections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.path} href={section.path} className="h-full">
                  <div className="group h-full text-left relative overflow-hidden rounded-xl border border-border bg-card p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <Icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-light mb-2 group-hover:text-primary transition-colors">
                      {isRTL ? section.titleAr : section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isRTL ? section.descriptionAr : section.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className={`mb-8 ${isRTL ? "text-right" : "text-left"}`}>
            <h2 className="text-2xl md:text-3xl font-light text-foreground mb-2 tracking-tight">
              {isRTL ? "مكتبة SNP" : "SNP Library"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {isRTL ? "استكشف مجالات البحث" : "Explore research domains"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {librarySections.map((section) => {
              const Icon = section.icon;
              return (
                <Link key={section.path} href={section.path}>
                  <div className="group text-left p-6 rounded-xl border border-border bg-card hover:bg-accent/30 hover:border-primary/20 transition-all duration-300 cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-1 group-hover:text-primary transition-colors">
                          {isRTL ? section.titleAr : section.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? section.descriptionAr : section.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-muted/30 border-t border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6 tracking-tight">
              {isRTL ? "عن SNP" : "About SNP"}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-8">
              {isRTL
                ? "SNP مكرسة لأبحاث تعدد أشكال النوكليوتيدات المفردة. نقدم مكتبة شاملة ومختبر للأبحاث والمشاريع المفتوحة المصدر."
                : "SNP is dedicated to Single Nucleotide Polymorphism research. We provide a comprehensive library and a lab for research and open-source projects."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/library"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                {isRTL ? "استكشف المكتبة" : "Explore Library"}
              </Link>
              <Link
                href="/lab/studies"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg border border-border bg-background hover:bg-accent transition-colors text-sm font-medium"
              >
                {isRTL ? "دراساتنا" : "Our Studies"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-muted border-t border-border">
        <div className="max-w-[1280px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={isRTL ? "text-right" : "text-left"}>
              <h3 className="text-lg font-semibold text-foreground mb-3">SNP</h3>
              <p className="text-sm text-muted-foreground">
                {isRTL
                  ? "استكشاف تعدد أشكال النوكليوتيدات المفردة وعلم الجينوم"
                  : "Exploring Single Nucleotide Polymorphisms & Genomics"}
              </p>
            </div>

            <div className={isRTL ? "text-right" : "text-left"}>
              <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                {isRTL ? "المكتبة" : "Library"}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/library/population-genomics" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {isRTL ? "علم الجينوم السكاني" : "Population Genomics"}
                  </Link>
                </li>
                <li>
                  <Link href="/library/human-health" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {isRTL ? "الصحة البشرية" : "Human Health"}
                  </Link>
                </li>
              </ul>
            </div>

            <div className={isRTL ? "text-right" : "text-left"}>
              <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                {isRTL ? "المختبر" : "Lab"}
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/lab/studies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {isRTL ? "دراساتنا" : "Our Studies"}
                  </Link>
                </li>
                <li>
                  <Link href="/lab/github" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {isRTL ? "GitHub الخاص بنا" : "Our GitHub"}
                  </Link>
                </li>
                <li>
                  <Link href="/lab/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {isRTL ? "المشاريع" : "Projects"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} SNP. {isRTL ? "جميع الحقوق محفوظة." : "All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
