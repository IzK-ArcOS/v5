import { get } from "svelte/store";
import { CurrentLanguage } from "./load";

export function D(id: string, ...inliners: any[]) {
  const lang = get(CurrentLanguage);

  if (!lang) return id;

  if (!lang.definitions[id]) return id;

  return inlineData(lang.definitions[id], inliners);
}

export function inlineData(langStr: string, inliners: string[]) {
  const split = langStr.split("%%");

  let result = "";

  for (let i = 0; i < split.length; i++) {
    const inliner = inliners[i] || "";
    result += `${split[i]}${inliner}`;
  }

  return result;
}
