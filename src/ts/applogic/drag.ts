import { get } from "svelte/store";
import type { App } from "./interface";
import { maxZIndex, updateStores } from "./store";

export function dragWindow(
  app: App,
  window: HTMLDivElement,
  titlebar: HTMLDivElement
) {
  window.addEventListener("mousedown", (e: MouseEvent) => {
    maxZIndex.set(get(maxZIndex) + 1);

    window.style.zIndex = get(maxZIndex).toString();

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

  updateStores();
}
