import { Log, LogLevel } from "../console";
import type { App } from "./interface";
import { focusedWindowId } from "./store";

export function dragWindow(
  app: App,
  window: HTMLDivElement,
  titlebar: HTMLDivElement
) {
  Log({
    msg: `Dragging window ${app.id}`,
    source: "drag.ts: dragWindow",
    level: LogLevel.info,
  });

  if (!app || !window || !titlebar)
    return Log({
      msg: `Can't drag ${app.id}: one or more required elements are missing!`,
      source: "drag.ts: dragWindow",
      level: LogLevel.error,
    });

  window.addEventListener("mousedown", (e: MouseEvent) => {
    focusedWindowId.set(app.id);

    if (e.composedPath().includes(titlebar)) {
      let xA: number, yA: number, xB: number, yB: number;

      e.preventDefault();

      document.onmousemove = (e: MouseEvent) => {
        xA = xB - e.clientX;
        yA = yB - e.clientY;

        xB = e.clientX;
        yB = e.clientY;

        window.style.top = window.offsetTop - yA + "px";
        window.style.left = window.offsetLeft - xA + "px";

        app.pos.x = window.offsetLeft - xA;
        app.pos.y = window.offsetTop - yA;
      };

      document.onmouseup = () => {
        document.onmouseup = null;
        document.onmousemove = null;
      };
    }
  });
}
