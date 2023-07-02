import { get } from "svelte/store";
import { WindowStore } from "../../applogic/store";

export function getParentDirectory(p: string) {
  const split = p.split("/");

  if (p == "./") return p;
  if (!split.length) return p;
  if (split.length == 1) return "./";

  split.splice(-1);

  const newPath = split.join("/");

  return newPath;
}

export function closeFile(id: string) {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == id) {
      ws[i].openedFile = null;
    }
  }

  WindowStore.set(ws);
}
