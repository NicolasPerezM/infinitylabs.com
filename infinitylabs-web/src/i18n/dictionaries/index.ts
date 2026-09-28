import type { Locale } from "../config";
import { en, type Dictionary } from "./en";
import { es } from "./es";
import { fr } from "./fr";

const dictionaries: Record<Locale, Dictionary> = { es, en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Tiny template helper: fill("{name} capabilities", { name: "Build" }). */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ""));
}

export type { Dictionary };
