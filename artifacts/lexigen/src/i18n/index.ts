import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import fr from "./locales/fr.json";
import es from "./locales/es.json";
import pt from "./locales/pt.json";
import de from "./locales/de.json";
import nl from "./locales/nl.json";
import it from "./locales/it.json";
import ar from "./locales/ar.json";
import fa from "./locales/fa.json";
import ru from "./locales/ru.json";
import ms from "./locales/ms.json";
import vi from "./locales/vi.json";
import tl from "./locales/tl.json";
import ja from "./locales/ja.json";
import yue from "./locales/yue.json";
import zh from "./locales/zh.json";
import af from "./locales/af.json";
import zu from "./locales/zu.json";
import xh from "./locales/xh.json";
import { applyMandarinOverrides } from "./mandarin-overrides";
import { applyPremiumPriceOverrides } from "./premium-pricing";

/** Map Lexigen language names → i18next language codes */
export const LANG_CODE: Record<string, string> = {
  "English": "en",
  "French": "fr",
  "Spanish": "es",
  "Portuguese": "pt",
  "German": "de",
  "Dutch": "nl",
  "Italian": "it",
  "Arabic": "ar",
  "Farsi": "fa",
  "Russian": "ru",
  "Bahasa Malay": "ms",
  "Vietnamese": "vi",
  "Tagalog": "tl",
  "Japanese": "ja",
  "Cantonese": "yue",
  "Chinese (Mandarin)": "zh",
  "Afrikaans": "af",
  "Zulu": "zu",
  "Xhosa": "xh",
};

/** RTL languages */
export const RTL_LANGS = new Set(["ar", "fa"]);

const storedLang = localStorage.getItem("lexigen-language") || "English";
const initialCode = LANG_CODE[storedLang] ?? "en";

// Set document direction on startup
document.documentElement.dir = RTL_LANGS.has(initialCode) ? "rtl" : "ltr";
document.documentElement.lang = initialCode;

i18n
  .use(initReactI18next)
  .init({
    lng: initialCode,
    fallbackLng: "en",
    resources: {
      en: { translation: applyPremiumPriceOverrides(en) },
      fr: { translation: applyPremiumPriceOverrides(fr) },
      es: { translation: applyPremiumPriceOverrides(es) },
      pt: { translation: applyPremiumPriceOverrides(pt) },
      de: { translation: applyPremiumPriceOverrides(de) },
      nl: { translation: applyPremiumPriceOverrides(nl) },
      it: { translation: applyPremiumPriceOverrides(it) },
      ar: { translation: applyPremiumPriceOverrides(ar) },
      fa: { translation: applyPremiumPriceOverrides(fa) },
      ru: { translation: applyPremiumPriceOverrides(ru) },
      ms: { translation: applyPremiumPriceOverrides(ms) },
      vi: { translation: applyPremiumPriceOverrides(vi) },
      tl: { translation: applyPremiumPriceOverrides(tl) },
      ja: { translation: applyPremiumPriceOverrides(ja) },
      yue: { translation: applyPremiumPriceOverrides(yue) },
      zh: { translation: applyPremiumPriceOverrides(applyMandarinOverrides(zh)) },
      af: { translation: applyPremiumPriceOverrides(af) },
      zu: { translation: applyPremiumPriceOverrides(zu) },
      xh: { translation: applyPremiumPriceOverrides(xh) },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
