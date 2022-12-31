import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import { WindowStore } from "./store";

export function hotSwapAppIcon(icon: string, appId: string) {
  Log({
    msg: `Changing app icon for ${appId} to ${icon}`,
    source: "icon.ts: hotSwapAppIcon",
    level: LogLevel.info,
  });

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == appId) {
      if (!Originals[appId]) Originals[appId] = `${ws[i].info.icon}`;

      ws[i].info.icon = icon;
    }
  }

  WindowStore.set(ws);
}

export function getOriginalIcon(appId: string) {
  Log({
    msg: `Pulling original icon of ${appId} from store`,
    source: "icon.ts: getOriginalAppIcon",
    level: LogLevel.info,
  });

  return Originals[appId];
}

export function resetAppIcon(appId: string) {
  Log({
    msg: `Restting icon of ${appId}`,
    source: "icon.ts: resetAppIcon",
    level: LogLevel.info,
  });

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

const Originals: { [key: string]: string } = {};
