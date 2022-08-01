import { get, writable, Writable } from "svelte/store";
import type { App } from "./interface";

export const WindowStore: Writable<App[]> = writable<App[]>([]);
export const OpenApps: Writable<App[]> = writable<App[]>([]);
export const isFullscreenWindow: Writable<boolean> = writable<boolean>(false);

export function getWindow(id: string): App {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id) return ws[i];
  }

  return null;
}

export function getStore() {
  let ws = get(WindowStore);

  ws = ws.filter(w => w != null);

  return ws;
}

export function getOpenedStore() {
  let oa = get(OpenApps);

  oa = oa.filter(w => w != null);

  return oa;
}

export function updateStores() {
  const ws = get(WindowStore);
  const oa = getOpenedStore();

  isFullscreenWindow.set(false);

  for (let i = 0; i < oa.length; i++) {
    const windowData = getWindow(oa[i].id);

    if (windowData) oa[i] = windowData;

    if (oa[i] && oa[i] && oa[i].state.windowState.fll && !oa[i].state.windowState.min) {
      isFullscreenWindow.set(true);
    }
  }

  OpenApps.set(oa);
  WindowStore.set(ws);
}
