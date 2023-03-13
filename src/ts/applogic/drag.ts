import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import type { App } from "./interface";
import { checkZones, snapWindow } from "./snapzones/main";
import { leftZoneTriggered } from "./snapzones/store";
import { focusedWindowId, WindowStore } from "./store";

export function dragWindow(
  app: App,
  window: HTMLDivElement,
  titlebar: HTMLDivElement
) {
  if (!app || !window || !titlebar)
    return Log({
      msg: `Can't drag ${app.id}: one or more required elements are missing!`,
      source: "drag.ts: dragWindow",
      level: LogLevel.error,
    });

  window.addEventListener("mousedown", (e: MouseEvent) => {
    let x, y;
    if (app.info.custom) return;

    focusedWindowId.set(app.id);

    if (e.composedPath().includes(titlebar)) {
      let xA: number, yA: number, xB: number, yB: number;

      e.preventDefault();

      document.onmousemove = (e: MouseEvent) => {
        app.snapped = false;

        WindowStore.set(get(WindowStore));

        xA = xB - e.clientX;
        yA = yB - e.clientY;

        xB = e.clientX;
        yB = e.clientY;

        let top = window.offsetTop - yA;
        const left = window.offsetLeft - xA;

        if (top < 0) top = 0;

        window.style.top = top + "px";
        window.style.left = left + "px";

        app.pos.x = left;
        app.pos.y = top;

        checkZones(xB, yB, app.id);

        [x, y] = [xB, yB];
      };

      document.onmouseup = () => {
        checkZones(x, y, app.id);
        snapWindow(app.id);
        leftZoneTriggered.set(false);
        rightZoneTriggered.set(false);
        document.onmouseup = null;
        document.onmousemove = null;
      };
    }
  });
}
