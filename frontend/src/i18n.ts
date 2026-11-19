import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { UI_LANG_STORAGE_KEY, chineseFromLanguages, dropLegacyUILang } from "./i18nDetect";
// Inline zh and ko so default/Korean UI is available synchronously (no FOUT)
import zhTranslation from "../public/locales/zh/translation.json";
import koTranslation from "../public/locales/ko/translation.json";

// UI locale codes — these own the `?lang=` query param (detector below).
// Text/source language FILTERS must use a different param (`tl`, see #709)
// and treat these codes as not-a-filter when reading legacy links.
export const SUPPORTED_UI_LANGS = ["zh", "zh-Hant", "en", "ko"] as const;

/**
 * The UI language to display/select in language pickers.
 */
export function currentUILang(instance: typeof i18n = i18n): string {
  const lng = instance.language ?? "";
  if ((SUPPORTED_UI_LANGS as readonly string[]).includes(lng)) return lng;
  if (lng.startsWith("zh-Hant")) return "zh-Hant";
  if (lng.startsWith("ko")) return "ko";
  const base = lng.split("-")[0];
  if ((SUPPORTED_UI_LANGS as readonly string[]).includes(base)) return base;
  return instance.resolvedLanguage ?? "ko";
}

dropLegacyUILang();

// 브라우저 언어 감지기
const detector = new LanguageDetector();
detector.addDetector({
  name: "navigatorChinese",
  lookup: () =>
    chineseFromLanguages(typeof navigator !== "undefined" ? navigator.languages : undefined),
});

i18n
  .use(HttpBackend)
  .use(detector)
  .use(initReactI18next)
  .init({
    fallbackLng: {
      ko: ["en", "zh"],
      default: ["zh"],
    },
    supportedLngs: [...SUPPORTED_UI_LANGS],
    load: "currentOnly",
    keySeparator: false,
    nsSeparator: false,
    ns: ["translation"],
    defaultNS: "translation",
    resources: {
      zh: { translation: zhTranslation },
      ko: { translation: koTranslation },
    },
    partialBundledLanguages: true,
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    detection: {
      order: ["querystring", "localStorage", "navigator", "navigatorChinese"],
      lookupQuerystring: "lang",
      lookupLocalStorage: UI_LANG_STORAGE_KEY,
      caches: [],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng === "zh" ? "zh-Hans" : lng === "ko" ? "ko-KR" : lng;
});

export default i18n;
