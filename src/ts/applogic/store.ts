import { get, writable, Writable } from "svelte/store";
import { Log, LogLevel } from "../console";
import type { App } from "./interface";

export const WindowStore: Writable<App[]> = writable<App[]>([]);
export const isFullscreenWindow: Writable<boolean> = writable<boolean>(false);
export const maxZIndex = writable<number>(1e9);
export const focusedWindowId: Writable<string> = writable<string>(null);

export function getWindow(id: string): App {
  Log({
    msg: `Getting appData of ${id} from WindowStore`,
    source: "store.ts: getWindow",
    level: LogLevel.info,
  });

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id) return ws[i];
  }

  return null;
}

export function getOpenedStore() {
  Log({
    msg: `Getting opened store`,
    source: "store.ts: getOpenedStore",
    level: LogLevel.info,
  });

  const ws = get(WindowStore);
  const x = [];

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].opened) x.push(ws[i]);
  }

  return x;
}

export function updateStores() {
  Log({
    msg: `Flushing all stores`,
    source: "store.ts: updateStores",
    level: LogLevel.info,
  });

  const ws = get(WindowStore);
  const oa = getOpenedStore();

  isFullscreenWindow.set(false);

  for (let i = 0; i < oa.length; i++) {
    const windowData = getWindow(oa[i].id);

    if (windowData) oa[i] = windowData;

    if (
      oa[i] &&
      oa[i] &&
      oa[i].state.windowState.fll &&
      !oa[i].state.windowState.min
    ) {
      isFullscreenWindow.set(true);
    }
  }

  WindowStore.set(ws);
}
