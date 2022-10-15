import { get } from "svelte/store";
import { OpenApps, WindowStore } from "./store";

export function isLoaded(id: string): boolean {
  const ws = get(WindowStore);
  const wsKeys = Object.keys(ws);

  for (let i = 0; i < wsKeys.length; i++) {
    const key = wsKeys[i];

    if (ws[key] && key == id) return true;
  }

  return false;
}

export function isOpened(id: string): boolean {
  const oa = get(OpenApps);
  const oaKeys = Object.keys(oa);

  for (let i = 0; i < oaKeys.length; i++) {
    const key = oaKeys[i];

    if (oa[key] && key == id) return true;
  }

  return false;
}

export function isMinimized(id: string): boolean {
  const ws = get(WindowStore);
  const wsKeys = Object.keys(ws);

  for (let i = 0; i < wsKeys.length; i++) {
    const key = wsKeys[i];
    const win = ws[key];

    if (win && key == id && win.state.windowState.min) return true;
  }

  return false;
}
