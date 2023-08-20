import { get } from "svelte/store";
import type { App } from "./interface";
import { checkZones, snapWindow } from "./snapzones/main";
import { leftZoneTriggered, rightZoneTriggered } from "./snapzones/store";
import { WindowStore, focusedWindowId } from "./store";
import { Log } from "../console";

/**
 * @WARNING This file needs a mass refactor, do not report issues related to the code execution within this file.
 */

export function dragWindow(
  app: App,
  window: HTMLDivElement,
  titlebar: HTMLDivElement
) {
  if (!app || !window || !titlebar) return;

  ["mousedown", "touchstart"].forEach((k) =>
    window.addEventListener(
      k,
      (e: MouseEvent) => {
        let x, y;
        if (app.info.custom) return;

        focusedWindowId.set(app.id);

        if (e.composedPath().includes(titlebar)) {
          try {
            window.querySelectorAll("iframe").forEach((i) => {
              i.style.pointerEvents = "none";
            });
          } catch {
            Log(
              "applogic/drag.ts: dragWindow",
              "Could not disable iframes in window!"
            );
          }

          let xA: number, yA: number, xB: number, yB: number;

          /* e.preventDefault(); */

          document.onmousemove = (e: MouseEvent) => {
            app.snapped = false;

            WindowStore.set(get(WindowStore));

            process(e.clientX, e.clientY);
          };

          document.ontouchmove = (e: TouchEvent) => {
            app.snapped = false;

            WindowStore.set(get(WindowStore));

            if (!e.touches.length || k == "mousedown") return;

            process(e.touches[0].clientX, e.touches[0].clientY);
          };

          function process(x: number, y: number) {
            xA = xB - x;
            yA = yB - y;

            xB = x;
            yB = y;

            let top = window.offsetTop - yA;
            const left = window.offsetLeft - xA;

            if (top < 0) top = 0;

            window.style.top = top + "px";
            window.style.left = left + "px";

            app.pos.x = left;
            app.pos.y = top;

            checkZones(xB, yB, app.id);

            [x, y] = [xB, yB];
          }

          document.onmouseup = document.ontouchend = () => {
            checkZones(x, y, app.id);
            snapWindow(app.id);
            leftZoneTriggered.set(false);
            rightZoneTriggered.set(false);
            document.onmouseup = null;
            document.onmousemove = null;
            document.ontouchend = null;
            document.ontouchmove = null;
            try {
              window.querySelectorAll("iframe").forEach((i) => {
                i.style.pointerEvents = "";
              });
            } catch {
              Log(
                "applogic/drag.ts: dragWindow",
                "Could not enable iframes in window!"
              );
            }
          };
        }
      },
      { passive: true }
    )
  );
}
