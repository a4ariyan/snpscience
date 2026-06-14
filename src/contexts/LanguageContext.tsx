"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  Language,
  DEFAULT_LANGUAGE,
  TranslationKey,
  t as translate,
} from "@/shared/language";
import { LANGUAGE_COOKIE } from "@/shared/language";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = LANGUAGE_COOKIE;

function persistLanguage(lang: Language) {
  localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  document.cookie = `${LANGUAGE_COOKIE}=${lang};path=/;max-age=31536000;SameSite=Lax`;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = lang;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "ar" || stored === "en") {
      setLanguageState(stored);
      persistLanguage(stored);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    persistLanguage(lang);
    router.refresh();
  };

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [language, mounted]);

  const t = (key: TranslationKey): string => {
    return translate(key, language);
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
