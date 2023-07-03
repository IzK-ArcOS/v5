import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import { actionCenterOpened } from "../desktop/actioncenter/main";
import { startOpened } from "../desktop/main";
import { destroyOverlayableError } from "../errorlogic/overlay";
import { getWindowElement } from "../window/main";
import { hideOverlay } from "../window/overlay";
import { centerWindow } from "./center";
import type { App, Process } from "./interface";
import { registerProcessShortcuts } from "./keyboard/main";
import { generatePID } from "./pid";
import {
  ProcessStore,
  focusedProcessPid,
  getApp,
  maxZIndex,
  updateStores,
} from "./store";

export function createProcess(
  appId: string,
  parentPid?: number
): number | null {
  Log({
    msg: `Opening ${appId}`,
    source: "events.ts: openWindow",
    level: LogLevel.info,
  });

  const app = getApp(appId);

  if (!app) {
    Log({
      msg: `Can't create process for ${appId}: app not found`,
      source: "events.ts: openWindow",
      level: LogLevel.error,
    });

    return null;
  }

  const procStore = get(ProcessStore);

  const pid = generatePID();

  const process: Process = {
    app: { ...app, pid },
    id: pid,
    pos: { x: 0, y: 0 },
    size: app.initialSize,
    windowState: app.initialWindowState,
    parentPid: parentPid,
    overlayProcesses: {},
  };

  procStore[process.id] = process;

  ProcessStore.set(procStore);

  /* centerWindow(process.id); */

  registerProcessShortcuts(process);

  if (app && app.core) return;

  setTimeout(() => {
    const el = getWindowElement(process.id);

    if (!el) return;

    maxZIndex.set(get(maxZIndex) + 1);

    el.style.zIndex = `${get(maxZIndex)}`;

    focusedProcessPid.set(process.id);
  }, 10);

  startOpened.set(false);
  actionCenterOpened.set(false);

  focusedProcessPid.set(process.id);

  if (app.events && app.events.open) app.events.open(process.id);

  return process.id;
}

export function closeProcess(pid: number): boolean {
  Log({
    msg: `Closing ${pid}`,
    source: "events.ts: closeWindow",
    level: LogLevel.info,
  });

  const processStore = get(ProcessStore);

  if (!processStore[pid]) {
    return false;
  }

  if (processStore[pid] && processStore[pid].app.core) return;

  if (processStore[pid].errorProcessOverlays) {
    const entries = Object.entries(processStore[pid].errorProcessOverlays);

    for (let i = 0; i < entries.length; i++) {
      destroyOverlayableError(entries[i][1].id, process.pid);
    }
  }

  if (processStore[pid].overlayProcesses) {
    const entries = Object.entries(processStore[pid].overlayProcesses);

    for (let i = 0; i < entries.length; i++) {
      hideOverlay(entries[i][1].id, pid);
    }
  }

  if (processStore[pid].children) {
    const entries = Object.entries(processStore[pid].children);

    for (let i = 0; i < entries.length; i++) {
      closeProcess(entries[i][1].id);
    }
  }

  processStore[pid].snapped = false;

  const processEvents = processStore[pid].app.events;
  if (processEvents && processEvents.close) processEvents.close(process.pid);

  delete processStore[pid];

  ProcessStore.set(processStore);

  return true;
}

export function toggleWindowMaximization(pid: number) {
  Log({
    msg: `Switching maximized state of process ${process.pid}`,
    source: "events.ts: maximizeWindow",
    level: LogLevel.info,
  });

  const processStore = get(ProcessStore);

  if (processStore[pid].app.core) return;

  processStore[pid].windowState.maximized =
    !processStore[pid].windowState.maximized;

  focusedProcessPid.set(process.pid);

  ProcessStore.set(processStore);

  if (processStore[pid].app.events && processStore[pid].app.events.maximize)
    processStore[pid].app.events.maximize(pid);

  updateStores();
}

export function toggleWindowMinimization(pid: number) {
  Log({
    msg: `Switching minimized state of process ${pid}`,
    source: "events.ts: minimizeWindow",
    level: LogLevel.info,
  });

  const processStore = get(ProcessStore);

  if (processStore[pid].app.core) return;

  processStore[pid].windowState.minimized =
    !processStore[pid].windowState.minimized;

  focusedProcessPid.set(null);

  if (processStore[pid].windowState.minimized) {
    const el = getWindowElement(pid);

    el.style.zIndex = "0";
  }

  if (processStore[pid].app.events && processStore[pid].app.events.minimize)
    processStore[pid].app.events.minimize(pid);

  ProcessStore.set(processStore);
}

export function unminimizeWindow(pid: number) {
  Log({
    msg: `Disabling minimized state of process ${pid}`,
    source: "events.ts: unminimizeWindow",
    level: LogLevel.info,
  });

  const processStore = get(ProcessStore);

  if (processStore[pid].app.core) return;

  processStore[pid].windowState.minimized = false;

  focusedProcessPid.set(pid);

  ProcessStore.set(processStore);
}

export function toggleWindowFullscreenization(pid: number) {
  Log({
    msg: `Switching fullscreen state of ${pid}`,
    source: "events.ts: fullscreenWindow",
    level: LogLevel.info,
  });

  const processStore = get(ProcessStore);

  if (processStore[pid].app.core) return;

  processStore[pid].windowState.fullscreen =
    !processStore[pid].windowState.fullscreen;

  focusedProcessPid.set(pid);

  const processEvents = processStore[pid].app.events;

  if (
    processEvents &&
    processEvents.enterFullscreen &&
    processStore[pid].windowState.fullscreen
  )
    processEvents.enterFullscreen(pid);

  if (
    processEvents &&
    processEvents.leaveFullscreen &&
    !processStore[pid].windowState.fullscreen
  )
    processEvents.leaveFullscreen(pid);

  ProcessStore.set(processStore);
}

export function toggleHeadlessWindowProperty(pid: number) {
  Log({
    msg: `Switching headless state of ${pid}`,
    source: "events.ts: headlessToggle",
    level: LogLevel.info,
  });

  const processStore = get(ProcessStore);

  if (processStore[pid].app.core) return;

  processStore[pid].app.windowProperties.headless =
    !processStore[pid].app.windowProperties.headless;

  focusedProcessPid.set(pid);

  ProcessStore.set(processStore);
}

// DUMMY FUNCTION
export function closeWindow(pid: number) {}

// DUMMY FUNCTION
export function openWindow(app: App) {}
