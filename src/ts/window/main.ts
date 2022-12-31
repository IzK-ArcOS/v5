import type { App } from "../applogic/interface";
import { Log, LogLevel } from "../console";

export function getWindowElement(app: App): HTMLDivElement {
  Log({
    msg: `Getting window element for ${app.id}`,
    source: "window/main.ts: getWindowElement",
    level: LogLevel.info,
  });

  const el = document.querySelector(`window#${app.id}`);

  return el as HTMLDivElement;
}
