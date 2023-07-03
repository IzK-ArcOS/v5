import { Log, LogLevel } from "../../console";
import type { App, Process } from "../interface";
import type { AppKeyCombinations } from "./interface";

export const appShortcuts: [number, AppKeyCombinations][] = [];

export function registerProcessShortcuts(process: Process) {
  Log({
    source: "keyboard: registerAppShortcuts",
    msg: `Registering app shortcuts for ${process.app.id} (PID: ${process.id})`,
    level: LogLevel.info,
  });
  if (!process.app.events || !process.app.events.keyboardShortcuts) return false;

  if (isRegistered(process.id)) return false;

  appShortcuts.push([process.id, process.app.events.keyboardShortcuts]);
}

export function registerShortcuts(pid: number, data: AppKeyCombinations) {
  appShortcuts.push([pid, data]);
}

export function isRegistered(pid: number): boolean {
  for (let i = 0; i < appShortcuts.length; i++) {
    if (appShortcuts[i][0] == pid) return true;
  }

  return false;
}
