import { get, writable, Writable } from "svelte/store";
import type { App } from "./interface";

export const WindowStore: Writable<App[]> = writable<App[]>([]);
export const OpenApps: Writable<App[]> = writable<App[]>([]);

export function getWindow(id: string): App {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == id) return ws[i];
  }

  return null;
}

export function updateStores() {
  const ws = get(WindowStore);
  const oa = get(OpenApps);

  for (let i = 0; i < oa.length; i++) {
    const windowData = getWindow(oa[i].id);

    if (windowData) oa[i] = windowData;
  }

  OpenApps.set(oa);
  WindowStore.set(ws);
}
