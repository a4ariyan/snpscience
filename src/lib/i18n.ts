import type { Language } from "@/shared/language";

export function t(lang: Language, en: string, ar: string) {
  return lang === "ar" ? ar : en;
}

export function isRtl(lang: Language) {
  return lang === "ar";
}
