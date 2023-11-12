import { Log } from "../console";
import { LogLevel } from "../console/interface";
import { UnknownIcon } from "../icon/apps";
import type { App } from "./interface";
import { WindowStore } from "./store";

export function hotSwapAppIcon(icon: string, appId: string) {
  Log(
    "icon.ts: hotSwapAppIcon",
    `Changing app icon for ${appId} to ${icon}`,
    LogLevel.info
  );

  WindowStore.update((ws) => {
    for (let i = 0; i < ws.length; i++) {
      if (ws[i].id == appId) {
        if (!Originals[appId]) Originals[appId] = `${getAppIcon(ws[i])}`;

        ws[i].info.icon = icon;
      }
    }

    return ws;
  });
}

export function getOriginalIcon(appId: string) {
  return Originals[appId];
}

export function resetAppIcon(appId: string) {
  Log("icon.ts: resetAppIcon", `Restting icon of ${appId}`);

  if (!Originals[appId]) return;

  WindowStore.update((ws) => {
    for (let i = 0; i < ws.length; i++) {
      if (ws[i].id == appId) {
        ws[i].info.icon = Originals[appId];

        delete Originals[appId];
      }
    }

    return ws;
  });
}

export function getAppIcon(app: App): string {
  //if (!app.info.builtin) return UnknownIcon;

  return app.info.icon;
}

const Originals: { [key: string]: string } = {};
