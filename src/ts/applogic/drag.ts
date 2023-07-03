import { get } from "svelte/store";
import { checkZones, snapWindow } from "./snapzones/main";
import { leftZoneTriggered, rightZoneTriggered } from "./snapzones/store";
import { ProcessStore, focusedProcessPid, maxZIndex } from "./store";

export function dragWindow(
  pid: number,
  window: HTMLDivElement,
  titlebar: HTMLDivElement
) {
  const process = get(ProcessStore)[pid];
  /* 
  if (!process || !window || !titlebar) {
    return Log({
      msg: `Can't drag ${pid}: one or more required elements are missing!`,
      source: "drag.ts: dragWindow",
      level: LogLevel.error,
    });
  } */

  ["mousedown", "touchstart"].forEach((k) =>
    window.addEventListener(k, (e: MouseEvent) => {
      maxZIndex.set(get(maxZIndex) + 1);

      window.style.zIndex = `${maxZIndex} !important`;

      let x, y;
      if (process.app.info.custom) return;

      focusedProcessPid.set(pid);

      if (e.composedPath().includes(titlebar)) {
        let xA: number, yA: number, xB: number, yB: number;

        e.preventDefault();

        document.onmousemove = (e: MouseEvent) => {
          process.snapped = false;
          move(e.clientX, e.clientY);
        };

        document.ontouchmove = (e: TouchEvent) => {
          process.snapped = false;
          if (!e.touches.length || k == "mousedown") return;

          move(e.touches[0].clientX, e.touches[0].clientY);
        };

        function move(x: number, y: number) {
          xA = xB - x;
          yA = yB - y;

          xB = x;
          yB = y;

          let top = window.offsetTop - yA;
          const left = window.offsetLeft - xA;

          if (top < 0) top = 0;

          window.style.top = top + "px";
          window.style.left = left + "px";

          process.pos.x = left;
          process.pos.y = top;

          checkZones(xB, yB, pid);

          [x, y] = [xB, yB];
        }

        document.onmouseup = document.ontouchend = () => {
          checkZones(x, y, pid);
          snapWindow(pid);
          leftZoneTriggered.set(false);
          rightZoneTriggered.set(false);
          document.onmouseup = null;
          document.onmousemove = null;
          document.ontouchend = null;
          document.ontouchmove = null;
        };
      }
    })
  );
}
