import { get } from "svelte/store";
import type { App } from "./interface";
import { AppStore, ProcessStore } from "./store";
import { UserData } from "../userlogic/interfaces";

export function isLoaded(id: string): boolean {
  const apps = Object.entries(get(AppStore));

  for (let i = 0; i < apps.length; i++) {
    if (apps[i][1] && apps[i][1].id == id) return true;
  }

  return false;
}

export function isMinimized(pid: number): boolean {
  const processStore = get(ProcessStore);

  for (const strI in processStore) {
    const i = parseInt(strI);
    if (processStore[i] && processStore[i].id == pid && processStore[i].windowState.minimized) return true;
  }

  return false;
}

export function isDisabled(id: string): boolean {
  const apps = Object.entries(get(AppStore));

  for (let i = 0; i < apps.length; i++) {
    if (apps[i][1] && apps[i][1].id == id && apps[i][1].disabled) return true;
  }

  return false;
}

export function isPopulatable(app: App) {
  if (get(UserData).sh.showHiddenApps && !app.disabled && !app.core)
    return true;

  return !app.disabled && !app.info.hidden && !app.info.custom;
}

// DUMMY FUNCTION
export function isOpened(app: App) {

}
