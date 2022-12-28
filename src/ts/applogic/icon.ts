import { get } from "svelte/store";
import { WindowStore } from "./store";

export function hotSwapAppIcon(icon: string, appId: string) {
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
  return Originals[appId];
}

export function resetAppIcon(appId: string) {
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
