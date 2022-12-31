import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import { getWindow, WindowStore } from "./store";

export function isLoaded(id: string): boolean {
  Log({
    msg: `Verifying loaded state of ${id}`,
    source: "checks.ts: isLoaded",
    level: LogLevel.info,
  });

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id) return true;
  }

  return false;
}

export function isOpened(id: string): boolean {
  Log({
    msg: `Verifying opened state of ${id}`,
    source: "checks.ts: isOpened",
    level: LogLevel.info,
  });

  const window = getWindow(id);

  if (!window) return false;

  return window.opened;
}

export function isMinimized(id: string): boolean {
  Log({
    msg: `Verifying minimized state of ${id}`,
    source: "checks.ts: isMinimized",
    level: LogLevel.info,
  });

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id && ws[i].state.windowState.min) return true;
  }

  return false;
}

export function isDisabled(id: string): boolean {
  Log({
    msg: `Verifying disabled state of ${id}`,
    source: "checks.ts: isDisabled",
    level: LogLevel.info,
  });

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i] && ws[i].id == id && ws[i].disabled) return true;
  }

  return false;
}
