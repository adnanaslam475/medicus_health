import i18next from "i18next";
import { translationJson } from "common/locales/translationJson";

// for dynamic pages only !!

export default function initTranslation(ns: Array<string>) {
  i18next.init({
    lng: "en", // if you're using a language detector, do not define the lng option
    // debug: true,
    resources: {
      en: translationJson("en"),
      es: translationJson("es"),
    },
    ns,
  });
}
