import type { App, Process } from "../applogic/interface";
import { Log, LogLevel } from "../console";

export function getWindowElement(pid: number): HTMLDivElement {
  const el = document.querySelector(`[data-pid="${pid}"]`);

  return el as HTMLDivElement;
}

export function getWindowElementByEvent(e: MouseEvent) {
  const path = e.composedPath() as HTMLDivElement[];

  for (let i = 0; i < path.length; i++) {
    const tagName = path[i].tagName;

    if (!tagName) continue;

    if (tagName.toLowerCase() == "window") return path[i];
  }
}
