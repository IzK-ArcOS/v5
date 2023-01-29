import { get } from "svelte/store";
import { openWindow } from "../../applogic/events";
import type { ArcFile } from "../../applogic/interface";
import { WindowStore } from "../../applogic/store";

export function findAppToOpen(mime: string) {
  const ids: string[] = [];

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (!ws[i].fileMimes) continue;

    if (ws[i].fileMimes.includes(mime)) ids.push(ws[i].id);
  }

  return ids;
}

export function openWith(appId: string, data: ArcFile) {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    const window = ws[i];
    if (
      !window.fileMimes ||
      !window.fileMimes.includes(data.mime) ||
      appId != window.id
    )
      continue;

    window.openedFile = data;

    openWindow(appId);

    if (window.events && window.events.openFile) window.events.openFile(window);

    return true;
  }

  return false;
}
