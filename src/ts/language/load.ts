import { writable } from "svelte/store";
import type { Language } from "./interface";
import { langPathStore } from "./pathstore";

export const CurrentLanguage = writable<Language>();

export async function setLanguage(code: string): Promise<boolean> {
  if (!langPathStore[code]) return false;

  const lang = langPathStore[code];

  try {
    const req = await (await fetch(lang.path)).json();

    CurrentLanguage.set({
      definitions: req,
      name: lang.name,
      code,
    });

    return true;
  } catch {
    return false;
  }
}
