import { get } from "svelte/store";
import { startOpened } from "../desktop/main";
import { isLoaded, isOpened } from "./checks";
import type { App } from "./interface";
import { getWindow, updateStores, WindowStore } from "./store";

export function openWindow(id: string) {
  if (!isLoaded(id) || !isOpened(id)) {
    console.error(id + "is opened.");
    return false;
  }

  const ws = get(WindowStore);

  if (!ws[id]) return console.error(id + " not in ws");

  ws[id].state.windowState.cls = false;

  WindowStore.set(ws);

  updateStores();
}

export function closeWindow(id: string) {
  if (!isLoaded(id) || !isOpened(id)) return false;

  const ws = get(WindowStore);

  if (!ws[id]) return;

  ws[id].state.windowState.cls = true;

  WindowStore.set(ws);
}

export function maximizeWindow(app: App) {
  app.state.windowState.max = !app.state.windowState.max;

  updateStores();
}

export function minimizeWindow(app: App) {
  app.state.windowState.min = !app.state.windowState.min;

  updateStores();
}

export function fullscreenWindow(app: App) {
  app.state.windowState.fll = !app.state.windowState.fll;

  updateStores();
}

export function headlessToggle(win: App) {
  win.state.headless = !win.state.headless;

  updateStores();
}
