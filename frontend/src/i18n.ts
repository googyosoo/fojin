import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { UI_LANG_STORAGE_KEY, dropLegacyUILang } from "./i18nDetect";
import koTranslation from "../public/locales/ko/translation.json";

// FoJin 한국어 단일 언어 모드
export const SUPPORTED_UI_LANGS = ["ko"] as const;

export function currentUILang(_instance?: any): string {
  return "ko";
}

dropLegacyUILang();

try {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(UI_LANG_STORAGE_KEY, "ko");
  }
} catch {
  // ignore
}

i18n
  .use(initReactI18next)
  .init({
    lng: "ko",
    fallbackLng: "ko",
    supportedLngs: ["ko"],
    load: "currentOnly",
    keySeparator: false,
    nsSeparator: false,
    ns: ["translation"],
    defaultNS: "translation",
    resources: {
      ko: { translation: koTranslation },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

document.documentElement.lang = "ko-KR";

export default i18n;
