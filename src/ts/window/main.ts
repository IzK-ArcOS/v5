import type { App } from "../applogic/interface";

export function getWindowElement(app: App): HTMLDivElement {
  const el = document.querySelector(`window#${app.id}`);

  return el as HTMLDivElement;
}
