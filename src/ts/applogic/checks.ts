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
  const ws = get(WindowStore);

  if (!ws[id]) return false;

  return !ws[id].state.windowState.cls
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
