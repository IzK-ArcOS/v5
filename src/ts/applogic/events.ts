import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import { ActionCenterOpened } from "../desktop/actioncenter/main";
import { startOpened } from "../desktop/main";
import { getWindowElement } from "../window/main";
import { isLoaded, isOpened } from "./checks";
import type { App } from "./interface";
import {
  focusedWindowId,
  getWindow,
  maxZIndex,
  updateStores,
  WindowStore,
} from "./store";

export function openWindow(id: string) {
  Log({
    msg: `Opening ${id}`,
    source: "events.ts: openWindow",
    level: LogLevel.info,
  });

  const window = getWindow(id);

  if (!isLoaded(id) || isOpened(id)) {
    const el = getWindowElement(window);

    if (!el) return;

    maxZIndex.set(get(maxZIndex) + 1);

    el.style.zIndex = `${get(maxZIndex)}`;

    return;
  }

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == id) ws[i].opened = true;
  }

  WindowStore.set(ws);

  setTimeout(() => {
    const el = getWindowElement(window);

    if (!el) return;

    maxZIndex.set(get(maxZIndex) + 1);

    el.style.zIndex = `${get(maxZIndex)}`;

    focusedWindowId.set(id);
  }, 10);

  startOpened.set(false);
  ActionCenterOpened.set(false);

  updateStores();

  focusedWindowId.set(id);

  if (window.events && window.events.open) window.events.open(window);

  return true;
}

export function openChildWindow(parent: App, childId: string) {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].parentId == parent.id && ws[i].id == childId) {
      openWindow(childId);

      return true;
    }
  }

  return false;
}

export function closeChildWindow(parent: App, childId: string) {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].parentId == parent.id && ws[i].id == childId) {
      closeWindow(childId);

      return true;
    }
  }

  return false;
}

export function closeWindow(id: string) {
  Log({
    msg: `Closing ${id}`,
    source: "events.ts: closeWindow",
    level: LogLevel.info,
  });

  if (!isOpened(id)) {
    return false;
  }

  const ws = get(WindowStore);
  const window = getWindow(id);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id) {
      ws[i].opened = false;
      break;
    }
  }

  if (window.children) {
    const entries = Object.entries(window.children);

    for (let i = 0; i < entries.length; i++) {
      closeChildWindow(window, entries[i][0]);
    }
  }

  WindowStore.set(ws);

  if (window.events && window.events.close) window.events.close(window);

  return true;
}

export function maximizeWindow(app: App) {
  Log({
    msg: `Switching maximized state of ${app.id}`,
    source: "events.ts: maximizeWindow",
    level: LogLevel.info,
  });

  app.state.windowState.max = !app.state.windowState.max;

  focusedWindowId.set(app.id);

  if (app.events && app.events.maximize) app.events.maximize(app);

  updateStores();
}

export function minimizeWindow(app: App) {
  Log({
    msg: `Switching minimized state of ${app.id}`,
    source: "events.ts: minimizeWindow",
    level: LogLevel.info,
  });

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
  Log({
    msg: `Switching fullscreen state of ${app.id}`,
    source: "events.ts: fullscreenWindow",
    level: LogLevel.info,
  });

  app.state.windowState.fll = !app.state.windowState.fll;

  focusedWindowId.set(app.id);

  if (app.events && app.events.enterFullscreen && app.state.windowState.fll)
    app.events.enterFullscreen(app);

  if (app.events && app.events.leaveFullscreen && !app.state.windowState.fll)
    app.events.leaveFullscreen(app);

  updateStores();
}

export function headlessToggle(app: App) {
  Log({
    msg: `Switching headless state of ${app.id}`,
    source: "events.ts: headlessToggle",
    level: LogLevel.info,
  });

  app.state.headless = !app.state.headless;

  focusedWindowId.set(app.id);

  updateStores();
}
