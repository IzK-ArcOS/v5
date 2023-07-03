import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import type { App } from "./interface";
import { AppStore } from "./store";
import def from "../../assets/apps/unknown.svg";

export function hotSwapAppIcon(icon: string, pid: number) {
  Log({
    msg: `Changing app icon for ${pid} to ${icon}`,
    source: "icon.ts: hotSwapAppIcon",
    level: LogLevel.info,
  });

  const appStore = get(AppStore);

  if (!Originals[pid]) Originals[pid] = `${getAppIcon(appStore[pid])}`;

  appStore[pid].info.icon = icon;

  AppStore.set(appStore);
}

export function getOriginalIcon(pid: number) {
  return Originals[pid];
}

export function resetAppIcon(pid: number) {
  Log({
    msg: `Restting icon of ${pid}`,
    source: "icon.ts: resetAppIcon",
    level: LogLevel.info,
  });

  if (!Originals[pid]) return;

  const appStore = get(AppStore);

  appStore[pid].info.icon = Originals[pid];

  AppStore.set(appStore);

  delete Originals[pid];
}

export function getAppIcon(app: App): string {
  if (!app.info.builtin) return def;

  return app.info.icon;
}

const Originals: { [key: number]: string } = {};
