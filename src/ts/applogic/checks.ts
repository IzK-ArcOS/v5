import { get } from "svelte/store";
import type { App } from "./interface";
import { getWindow, WindowStore } from "./store";
import { UserData } from "../userlogic/interfaces";

export function isLoaded(id: string): boolean {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id) return true;
  }

  return false;
}

export function isOpened(id: string): boolean {
  const window = getWindow(id);

  if (!window) return false;

  return window.opened;
}

export function isMinimized(id: string): boolean {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id && ws[i].state.windowState.min) return true;
  }

  return false;
}

export function isDisabled(id: string): boolean {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id && ws[i].disabled) return true;
  }

  return false;
}

export function isPopulatable(app: App) {
  if (get(UserData).sh.showHiddenApps && !app.disabled) return true;

  return !app.disabled && !app.info.hidden && !app.info.custom;
}
