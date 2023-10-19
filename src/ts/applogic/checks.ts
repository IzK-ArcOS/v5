import { get } from "svelte/store";
import { makeNotification } from "../notiflogic/main";
import sleep from "../sleep";
import { UserData } from "../userlogic/interfaces";
import { closeWindow } from "./events";
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
  if (
    get(UserData).sh.showHiddenApps &&
    !app.disabled &&
    !app.core &&
    app.id != "ExperimentsApp"
  )
    return true;

  return !app.disabled && !app.info.hidden && !app.info.custom;
}

export async function checkFileRequirement(appId: string) {
  const app = getWindow(appId);

  if (!app.info.requiresFile) return;

  await sleep(100);

  if (app.openedFile) return;

  makeNotification({
    icon: "warning",
    title: "Could not open app",
    message: `${app.info.name} requires a file to be able to open, it cannot be opened this way.`,
    buttons: [],
  });

  closeWindow(app.id);
}
