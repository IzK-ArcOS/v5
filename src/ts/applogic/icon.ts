import { get } from "svelte/store";
import { LogLevel } from "../console/interface";
import type { App } from "./interface";
import { WindowStore } from "./store";
import { Log } from "../console";
import { UnknownIcon } from "../icon/apps";

export function hotSwapAppIcon(icon: string, appId: string) {
  Log(
    "icon.ts: hotSwapAppIcon",
    `Changing app icon for ${appId} to ${icon}`,
    LogLevel.info
  );

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == appId) {
      if (!Originals[appId]) Originals[appId] = `${getAppIcon(ws[i])}`;

      ws[i].info.icon = icon;
    }
  }

  WindowStore.set(ws);
}

export function getOriginalIcon(appId: string) {
  return Originals[appId];
}

export function resetAppIcon(appId: string) {
  Log("icon.ts: resetAppIcon", `Restting icon of ${appId}`);

  if (!Originals[appId]) return;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == appId) {
      ws[i].info.icon = Originals[appId];

      delete Originals[appId];
    }
  }

  WindowStore.set(ws);
}

export function getAppIcon(app: App): string {
  if (!app.info.builtin) return UnknownIcon;

  return app.info.icon;
}

const Originals: { [key: string]: string } = {};
