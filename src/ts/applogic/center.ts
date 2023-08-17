import { get } from "svelte/store";
import { Log } from "../console";
import { getWindowElement } from "../window/main";
import type { App, XY } from "./interface";
import { WindowStore } from "./store";

export function centerWindow(id: string) {
  Log(`applogic/center.ts: centerWindow`, `Centering ${id}`);

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == id) {
      ws[i].pos = calculatePos(ws[i]);

      WindowStore.set(ws);
    }
  }
}

export function calculatePos(app: App): XY & { centered: boolean } {
  Log(`applogic/center.ts: calculatePos`, `Calculating position for ${app.id}`);

  const el = getWindowElement(app);

  if (!el) return { x: 0, y: 0, centered: false };

  const windowWidth = el.offsetWidth;
  const windowHeight = el.offsetHeight;

  const screenWidth = document.body.offsetWidth;
  const screenHeight = document.body.offsetHeight;

  const x = (screenWidth - windowWidth) / 2;
  const y = (screenHeight - windowHeight) / 2;

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  return { x, y, centered: true };
}
