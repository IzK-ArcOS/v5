import { get } from "svelte/store";
import { WindowStore } from "../../applogic/store";
import type { SearchItem } from "../interface";
import { openWindow } from "../../applogic/events";

export function compileSearchableApps(): SearchItem[] {
  const result: SearchItem[] = [];

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].info.hidden || ws[i].info.custom) continue;

    result.push({
      caption: ws[i].info.name,
      description: ws[i].info.description,
      image: ws[i].info.icon,
      action: () => {
        openWindow(ws[i].id);
      },
    });
  }

  return result;
}
