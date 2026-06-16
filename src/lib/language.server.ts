import { cache } from "react";
import { cookies } from "next/headers";
import { DEFAULT_LANGUAGE, LANGUAGE_COOKIE, type Language } from "@/shared/language";

export { LANGUAGE_COOKIE };

export const getServerLanguage = cache(async (): Promise<Language> => {
  const cookieStore = await cookies();
  const lang = cookieStore.get(LANGUAGE_COOKIE)?.value;
  return lang === "ar" || lang === "en" ? lang : DEFAULT_LANGUAGE;
});
