import { get } from "svelte/store";
import { WindowStore } from "./store";

export function setTitleSuffix(content: string, appId: string) {
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
