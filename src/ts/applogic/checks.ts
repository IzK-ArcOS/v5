import { get } from "svelte/store";
import { UserData } from "../userlogic/interfaces";
import type { App } from "./interface";
import { getWindow, WindowStore } from "./store";

export function isLoaded(id: string): boolean {
  const ws = get(WindowStore);

  return !!ws.filter((a) => a && a.id == id).length;
}

export function isOpened(id: string): boolean {
  const window = getWindow(id);

  if (!window) return false;

  return window.opened;
}

export function isMinimized(id: string): boolean {
  const ws = get(WindowStore);

  return !!ws.filter((a) => a && a.id == id && a.state.windowState.min).length;
}

export function isDisabled(id: string): boolean {
  const ws = get(WindowStore);

  return !!ws.filter((a) => a && a.id == id && a.disabled).length;
}

export function isPopulatable(app: App) {
  if (get(UserData).sh.showHiddenApps && !app.disabled && !app.core)
    return true;

  return !app.disabled && !app.info.hidden && !app.info.custom;
}
