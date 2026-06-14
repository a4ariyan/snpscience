"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, Moon, Sun, X } from "lucide-react";
import { MasterMenu } from "@/components/layouts/MasterMenu";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isArabic = language === "ar";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border/50"
            : "bg-background/98 backdrop-blur-md border-b border-border"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <span className="text-lg font-semibold cursor-pointer whitespace-nowrap tracking-wide">
                SNP
              </span>
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-lg hover:bg-accent/80 active:scale-95 transition-all duration-200"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
            <span className="text-sm font-light tracking-wide">
              {isArabic ? "القائمة" : "Menu"}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-lg hover:bg-accent/80 active:scale-95 transition-all duration-200"
              aria-label="Search"
            >
              <Search className="w-5 h-5" strokeWidth={1.5} />
            </button>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg hover:bg-accent/80 active:scale-95 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Moon className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>

            <button
              onClick={toggleLanguage}
              className="text-sm font-light px-3 py-2 rounded-lg hover:bg-accent/80 active:scale-95 transition-all duration-200 tracking-wide"
              aria-label="Toggle language"
            >
              {isArabic ? "EN" : "عربي"}
            </button>
          </div>
        </div>
      </header>

      <MasterMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {searchOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-center pt-32"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="w-full max-w-3xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card border border-border rounded-xl shadow-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-light tracking-tight">Search SNP</h2>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-2 rounded-lg hover:bg-accent transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Search studies, projects..."
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                autoFocus
              />

              <p className="text-sm text-muted-foreground mt-4 flex items-center gap-2">
                <kbd className="px-2 py-1 bg-muted rounded text-xs">ESC</kbd>
                to close
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
