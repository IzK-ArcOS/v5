import { get } from "svelte/store";
import { Log } from "../console";
import { LogLevel } from "../console/interface";
import { WindowStore } from "./store";

export function setTitleSuffix(content: string, appId: string) {
  Log({
    msg: `Setting title suffix of ${appId}`,
    source: "title.ts: setTitleSuffix",
    level: LogLevel.info,
  });

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == appId) {
      if (!Originals[appId]) Originals[appId] = `${ws[i].info.titleSuffix}`;

      ws[i].info.titleSuffix = content;
    }
  }

  WindowStore.set(ws);
}

export function resetTitleSuffix(appId: string) {
  Log({
    msg: `Resetting title suffix of ${appId}`,
    source: "title.ts: resetTitleSuffix",
    level: LogLevel.info,
  });

  if (!Originals[appId]) return;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == appId) {
      ws[i].info.titleSuffix = Originals[appId];

      delete Originals[appId];
    }
  }

  WindowStore.set(ws);
}

const Originals: { [key: string]: string } = {};
