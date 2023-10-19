import { Log } from "../console";
import { LogLevel } from "../console/interface";
import { WindowStore } from "./store";

export function setTitleSuffix(content: string, appId: string) {
  WindowStore.update((ws) => {
    for (let i = 0; i < ws.length; i++) {
      if (ws[i].id == appId) {
        if (!Originals[appId]) Originals[appId] = `${ws[i].info.titleSuffix}`;

        ws[i].info.titleSuffix = content;
      }
    }
    return ws;
  });
}

export function resetTitleSuffix(appId: string) {
  Log(
    "title.ts: resetTitleSuffix",
    `Resetting title suffix of ${appId}`,
    LogLevel.info
  );

  if (!Originals[appId]) return;

  WindowStore.subscribe((ws) => {
    for (let i = 0; i < ws.length; i++) {
      if (ws[i].id == appId) {
        ws[i].info.titleSuffix = Originals[appId];

        delete Originals[appId];
      }
    }

    return ws;
  });
}

const Originals: { [key: string]: string } = {};
