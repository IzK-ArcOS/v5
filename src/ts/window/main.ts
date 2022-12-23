import type { App } from "../applogic/interface";

export function getWindowElement(app: App): HTMLDivElement {
  const el = document.querySelector(`div.window#${app.id}`);

  return el as HTMLDivElement;
}
