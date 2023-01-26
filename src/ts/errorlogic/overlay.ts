import { get } from "svelte/store";
import type { OverlayableError } from "../applogic/interface";
import { WindowStore } from "../applogic/store";

export function createOverlayableError(
  error: OverlayableError,
  targetId: string
): boolean {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    const window = ws[i];

    if (window.id != targetId) continue;

    if (!window.errorOverlays) window.errorOverlays = [];

    window.errorOverlays.push({
      ...error,
      id: `${Math.floor(Math.random() * 1e9)}`,
    });

    WindowStore.set(ws);

    return true;
  }

  return false;
}

export function destroyOverlayableError(errorId: string, ownerId: string) {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    const window = ws[i];

    if (window.id != ownerId || !window.errorOverlays) continue;

    const errors = window.errorOverlays;

    for (let j = 0; j < errors.length; j++) {
      if (errors[j].id != errorId) continue;

      errors.splice(j, 1);

      WindowStore.set(ws);

      return true;
    }
  }

  return false;
}
