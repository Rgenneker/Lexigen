import { useState, useEffect } from "react";

export function useLanguageStore() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("lexigen-language") || "English";
  });

  useEffect(() => {
    localStorage.setItem("lexigen-language", language);
  }, [language]);

  return { language, setLanguage };
}
