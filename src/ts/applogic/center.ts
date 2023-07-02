import { get } from "svelte/store";
import { getWindowElement } from "../window/main";
import type { App, XY } from "./interface";
import { WindowStore } from "./store";

export function centerWindow(id: string) {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == id) {
      ws[i].pos = calculatePos(ws[i]);

      WindowStore.set(ws);
    }
  }
}

export function calculatePos(app: App): XY & { centered: true } {
  const el = getWindowElement(app);

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
