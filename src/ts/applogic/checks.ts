import { get } from "svelte/store";
import type { App } from "./interface";
import { getWindow, WindowStore } from "./store";
import { UserData } from "../userlogic/interfaces";
import { Log } from "../console";

export function isLoaded(id: string): boolean {
  Log(`applogic/checks.ts: isLoaded`, id);

  const ws = get(WindowStore);

  return !!ws.filter((a) => a && a.id == id).length;
}

export function isOpened(id: string): boolean {
  Log(`applogic/checks.ts: isOpened`, id);

  const window = getWindow(id);

  if (!window) return false;

  return window.opened;
}

export function isMinimized(id: string): boolean {
  Log(`applogic/checks.ts: isMinimized`, id);

  const ws = get(WindowStore);

  return !!ws.filter((a) => a && a.id == id && a.state.windowState.min).length;
}

export function isDisabled(id: string): boolean {
  Log(`applogic/checks.ts: isDisabled`, id);

  const ws = get(WindowStore);

  return !!ws.filter((a) => a && a.id == id && a.disabled).length;
}

export function isPopulatable(app: App) {
  Log(`applogic/checks.ts: isPopulatable`, app.id);

  if (get(UserData).sh.showHiddenApps && !app.disabled && !app.core)
    return true;

  return !app.disabled && !app.info.hidden && !app.info.custom;
}
