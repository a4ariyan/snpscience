"use client";

import { Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/i18n";

export function FooterSettings() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const isRTL = language === "ar";

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleTheme}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="w-4 h-4" />
        ) : (
          <Moon className="w-4 h-4" />
        )}
        <span>{theme === "dark" ? t(language, "Light Mode", "الوضع الفاتح") : t(language, "Dark Mode", "الوضع الداكن")}</span>
      </button>

      <div className="w-px h-4 bg-border" />

      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Toggle language"
      >
        <Globe className="w-4 h-4" />
        <span>{isRTL ? "English" : "العربية"}</span>
      </button>
    </div>
  );
}