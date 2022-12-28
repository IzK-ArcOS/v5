import { get, writable } from "svelte/store";
import type { TrayIcon } from "./interface";

export const trayIcons = writable<TrayIcon[]>([]);

export function createTrayIcon(data: TrayIcon) {
  if (trayExists(data.identifier)) return false;

  const icons = get(trayIcons);

  icons.push(data);

  trayIcons.set(icons);
}

export function disposeTrayIcon(identifier: string) {
  const icons = get(trayIcons);

  for (let i = 0; i < icons.length; i++) {
    if (icons[i].identifier == identifier) icons.splice(i, 1);
  }

  trayIcons.set(icons);
}

export function trayExists(identifier: string): boolean {
  const icons = get(trayIcons);

  for (let i = 0; i < icons.length; i++) {
    if (icons[i].identifier == identifier) return true;
  }

  return false;
}
