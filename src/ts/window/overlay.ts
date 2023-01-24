import { get } from "svelte/store";
import { WindowStore } from "../applogic/store";

export function showOverlay(id: string, parentId: string) {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == parentId) {
      if (!ws[i].overlays || !ws[i].overlays[id]) return false;

      ws[i].overlays[id].show = true;
    }
  }

  WindowStore.set(ws);
}

export function hideOverlay(id: string, parentId: string) {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == parentId) {
      if (!ws[i].overlays || !ws[i].overlays[id]) return false;

      ws[i].overlays[id].show = false;
    }
  }

  WindowStore.set(ws);
}
