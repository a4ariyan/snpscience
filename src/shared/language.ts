export type Language = "en" | "ar";

export const DEFAULT_LANGUAGE: Language = "en";

export const LANGUAGE_COOKIE = "snp-language";

export const translations = {
  en: {
    home: "Home",
    search: "Search",
    loading: "Loading...",
  },
  ar: {
    home: "الرئيسية",
    search: "بحث",
    loading: "جاري التحميل...",
  },
};

export type TranslationKey = keyof typeof translations.en;

export function t(key: TranslationKey, language: Language): string {
  return translations[language][key] || translations.en[key] || key;
}
