import { get } from "svelte/store";
import { Log } from "../console";
import { ActionCenterOpened } from "../desktop/actioncenter/main";
import { attentionId, startOpened } from "../desktop/main";
import { destroyOverlayableError } from "../errorlogic/overlay";
import { getWindowElement } from "../window/main";
import { hideOverlay } from "../window/overlay";
import { isDisabled, isLoaded, isOpened } from "./checks";
import type { App } from "./interface";
import {
  WindowStore,
  focusedWindowId,
  getWindow,
  maxZIndex,
  updateStores,
} from "./store";
import { LogLevel } from "../console/interface";

export function openWindow(id: string, openChild = false) {
  Log("events.ts: openWindow", `Opening ${id}`);

  if (isDisabled(id)) return;

  const window = getWindow(id);

  if (window && window.core) return;

  if (!isLoaded(id) || isOpened(id)) {
    const el = getWindowElement(window);

    if (!el) return;

    maxZIndex.set(get(maxZIndex) + 1);

    el.style.zIndex = `${get(maxZIndex)}`;

    unminimizeWindow(window);

    return;
  }

  if (window.parentId && !isOpened(window.parentId)) {
    if (!openChild) {
      Log(
        "events.ts: openWindow",
        `The parent "${window.parentId}" of child window "${window.id}" must be opened before the child can be opened.`,
        LogLevel.error
      );
      return false;
    }

    openWindow(window.parentId);
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

    attentionId.set(id);
  }, 10);

  startOpened.set(false);
  ActionCenterOpened.set(false);

  updateStores();

  attentionId.set(id);

  if (window.events && window.events.open) window.events.open(window);

  return true;
}

export function openChildWindow(parentId: string, childId: string) {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].parentId == parentId && ws[i].id == childId) {
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
  Log("events.ts: closeWindow", `Closing ${id}`);

  if (!isOpened(id)) {
    return false;
  }

  const ws = get(WindowStore);
  const window = getWindow(id);

  if (window && window.core) return;

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id) {
      ws[i].opened = false;
      ws[i].openedFile = null;
      break;
    }
  }

  if (window.children) {
    const entries = Object.entries(window.children);

    for (let i = 0; i < entries.length; i++) {
      closeChildWindow(window, entries[i][0]);
    }
  }

  if (window.errorOverlays) {
    for (let i = 0; i < window.errorOverlays.length; i++) {
      destroyOverlayableError(window.errorOverlays[i].id, window.id);
    }
  }

  if (window.overlays) {
    const entries = Object.entries(window.overlays);

    for (let i = 0; i < entries.length; i++) {
      hideOverlay(entries[i][0], id);
    }
  }

  window.snapped = false;

  WindowStore.set(ws);

  if (window.events && window.events.close) window.events.close(window);

  return true;
}

export function maximizeWindow(app: App) {
  Log(
    "events.ts: maximizeWindow",
    `Switching maximized state of ${app.id}`,
    LogLevel.info
  );

  if (app.core) return;

  app.state.windowState.max = !app.state.windowState.max;

  focusedWindowId.set(app.id);

  if (app.events && app.events.maximize) app.events.maximize(app);

  updateStores();
}

export function minimizeWindow(app: App) {
  Log(
    "events.ts: minimizeWindow",
    `Switching minimized state of ${app.id}`,
    LogLevel.info
  );

  if (app.core) return;

  app.state.windowState.min = !app.state.windowState.min;

  focusedWindowId.set(null);

  if (app.state.windowState.min) {
    const el = getWindowElement(app);

    el.style.zIndex = "0";
  }

  if (app.events && app.events.minimize) app.events.minimize(app);

  updateStores();
}

export function unminimizeWindow(app: App) {
  Log(
    "events.ts: unminimizeWindow",
    `Disabling minimized state of ${app.id}`,
    LogLevel.info
  );

  if (app.core) return;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == app.id) ws[i].state.windowState.min = false;
  }

  focusedWindowId.set(app.id);

  WindowStore.set(ws);
}

export function fullscreenWindow(app: App) {
  Log(
    "events.ts: fullscreenWindow",
    `Switching fullscreen state of ${app.id}`,
    LogLevel.info
  );

  if (app.core) return;

  app.state.windowState.fll = !app.state.windowState.fll;

  focusedWindowId.set(app.id);

  if (app.events && app.events.enterFullscreen && app.state.windowState.fll)
    app.events.enterFullscreen(app);

  if (app.events && app.events.leaveFullscreen && !app.state.windowState.fll)
    app.events.leaveFullscreen(app);

  updateStores();
}

export function headlessToggle(app: App) {
  Log(
    "events.ts: headlessToggle",
    `Switching headless state of ${app.id}`,
    LogLevel.info
  );

  if (app.core) return;

  app.state.headless = !app.state.headless;

  focusedWindowId.set(app.id);

  updateStores();
}
export function fullscreenToggle(id: string) {
  Log(
    "events.ts: fullscreenToggle",
    `Switching fullscreen state of ${id}`,
    LogLevel.info
  );

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id != id) continue;

    if (ws[i].core) continue;

    ws[i].state.windowState.fll = !ws[i].state.windowState.fll;
  }

  WindowStore.set(ws);
}

export function requestUserAttention(id: string) {
  Log(
    "events.ts: requestUserAttention",
    `Requesting user attention for App ${id}`
  );
  if (!getWindow(id) || !isLoaded(id) || isDisabled(id)) return;

  attentionId.set(id);
}
