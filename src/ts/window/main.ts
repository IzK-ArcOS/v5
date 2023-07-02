import type { App } from "../applogic/interface";

export function getWindowElement(app: App): HTMLDivElement {
  const el = document.querySelector(`window#${app.id}`);

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
