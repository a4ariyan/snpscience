"use client";

import { useState, useEffect } from "react";
import { Search, Moon, Sun, Menu, X, Globe } from "lucide-react";
import { MasterMenu } from "@/components/layouts/MasterMenu";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const isRTL = language === "ar";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => setLanguage(language === "en" ? "ar" : "en");

  return (
    <>
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
    </>
  );
}
