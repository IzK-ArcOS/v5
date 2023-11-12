import { get, writable } from "svelte/store";
import type { SideloadedApp } from "./interface";

export const SideloadedStore = writable<SideloadedApp[]>([]);

export function getSideload(tag: string): SideloadedApp | false {
  const sideloads = get(SideloadedStore);

  for (let i = 0; i < sideloads.length; i++) {
    if (sideloads[i].tag == tag) return sideloads[i];
  }

  return false;
}
