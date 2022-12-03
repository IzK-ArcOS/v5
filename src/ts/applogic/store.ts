import { get, writable, Writable } from "svelte/store";
import type { App } from "./interface";

export type WS = { [key: string]: App };

export const WindowStore: Writable<WS> = writable<WS>({});
export const OpenApps: Writable<WS> = writable<WS>({});
export const isFullscreenWindow: Writable<boolean> = writable<boolean>(false);

export function getWindow(id: string): App {
  const ws = get(WindowStore);
  const keys = Object.keys(ws);

  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == id) return ws[keys[i]];
  }

  return null;
}

export function getStore() {
  let ws = get(WindowStore);

  return ws;
}

export function getOpenedStore() {
  const ws = get(WindowStore);

  const entries = Object.entries(ws);

  let end: WS = {};

  for (let i = 0; i < entries.length; i++) {
    if (!entries[i][1].state.windowState.cls) {
      end[entries[i][0]] = entries[i][1];
    }
  }

  return end;
}

export function updateStores() {
  /*   const ws = get(WindowStore);
  const oa = getOpenedStore();

  const oaKeys = Object.keys(oa);

  isFullscreenWindow.set(false);

  for (let i = 0; i < oaKeys.length; i++) {
    const key = oaKeys[i];
    const windowData = getWindow(key);

    if (windowData) oa[key] = windowData;

    if (
      oa[key] &&
      key &&
      oa[key].state.windowState.fll &&
      !oa[key].state.windowState.min
    ) {
      isFullscreenWindow.set(true);
    }
  }

  WindowStore.set(ws); */
}
