import { get } from "svelte/store";
import { startOpened } from "../desktop/main";
import { getWindowElement } from "../window/main";
import { isLoaded, isOpened } from "./checks";
import type { App } from "./interface";
import { focusedWindowId, getWindow, OpenApps, updateStores } from "./store";

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

  focusedWindowId.set(id);

  if (window.events && window.events.open) window.events.open(window);

  return true;
}

export function closeWindow(id: string) {
  if (!isOpened(id)) {
    return false;
  }

  const window = getWindow(id);
  const oa = get(OpenApps);

  for (let i = 0; i < oa.length; i++) {
    if (oa[i] && oa[i].id == id) {
      oa[i] = null;
      break;
    }
  }

  OpenApps.set(oa);

  if (window.events && window.events.close) window.events.close(window);

  return true;
}

export function maximizeWindow(app: App) {
  app.state.windowState.max = !app.state.windowState.max;

  focusedWindowId.set(app.id);

  if (app.events && app.events.maximize) app.events.maximize(app);

  updateStores();
}

export function minimizeWindow(app: App) {
  app.state.windowState.min = !app.state.windowState.min;

  focusedWindowId.set(null);

  if (app.state.windowState.min) {
    const el = getWindowElement(app);

    el.style.zIndex = "0";
  }

  if (app.events && app.events.minimize) app.events.minimize(app);

  updateStores();
}

export function fullscreenWindow(app: App) {
  app.state.windowState.fll = !app.state.windowState.fll;

  focusedWindowId.set(app.id);

  if (app.events && app.events.enterFullscreen && app.state.windowState.fll)
    app.events.enterFullscreen(app);

  if (app.events && app.events.leaveFullscreen && !app.state.windowState.fll)
    app.events.leaveFullscreen(app);

  updateStores();
}

export function headlessToggle(app: App) {
  app.state.headless = !app.state.headless;

  focusedWindowId.set(app.id);

  updateStores();
}

//OpenApps.subscribe(updateStores);
