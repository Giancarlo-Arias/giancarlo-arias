import en from "./en";
import es from "./es";
import type { Locale } from "./types";

export type { Locale, Localized, PageId } from "./types";
export const getMessages = (locale: Locale) => locale === "en" ? en : es;

