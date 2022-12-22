import { get } from "svelte/store";
import { startOpened } from "../desktop/main";
import { isLoaded, isOpened } from "./checks";
import type { App } from "./interface";
import { getWindow, OpenApps, updateStores, WindowStore } from "./store";

export function openWindow(id: string) {
  if (!isLoaded(id) || isOpened(id)) {
    return false;
  }

  const oa = get(OpenApps);

  const window = { ...getWindow(id), id };

  oa.push(window);

  OpenApps.set(oa);

  startOpened.set(false);

  updateStores();

  return true;
}

export function closeWindow(id: string) {
  if (!isOpened(id)) {
    return false;
  }

  const oa = get(OpenApps);

  for (let i = 0; i < oa.length; i++) {
    if (oa[i] && oa[i].id == id) {
      oa[i] = null;
      break;
    }
  }

  OpenApps.set(oa);

  return true;
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

//OpenApps.subscribe(updateStores);
