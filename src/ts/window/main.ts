import type { App } from "../applogic/interface";
import { Log, LogLevel } from "../console";

export function getWindowElement(app: App): HTMLDivElement {
  const el = document.querySelector(`window#${app.id}`);

  return el as HTMLDivElement;
}
