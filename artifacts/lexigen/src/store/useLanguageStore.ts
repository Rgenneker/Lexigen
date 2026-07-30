import { useState, useEffect } from "react";
import i18n, { LANG_CODE, RTL_LANGS } from "@/i18n";

export function useLanguageStore() {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem("lexigen-language") || "English";
  });

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("lexigen-language", lang);
    const code = LANG_CODE[lang] ?? "en";
    i18n.changeLanguage(code);
    document.documentElement.dir = RTL_LANGS.has(code) ? "rtl" : "ltr";
    document.documentElement.lang = code;
  };

  useEffect(() => {
    // Sync i18n on mount in case it drifted
    const code = LANG_CODE[language] ?? "en";
    if (i18n.language !== code) {
      i18n.changeLanguage(code);
    }
    document.documentElement.dir = RTL_LANGS.has(code) ? "rtl" : "ltr";
    document.documentElement.lang = code;
  }, []);

  return { language, setLanguage };
}
