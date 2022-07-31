import type { App } from "./interface";
import { updateStores } from "./store";

export function dragWindow(app: App, elmnt: HTMLElement) {
    elmnt = elmnt as HTMLDivElement;
    const titlebar = elmnt.childNodes[0]! as HTMLDivElement;
  
    elmnt.addEventListener("mousedown", (e: MouseEvent) => {
      if (e.composedPath().includes(titlebar)) {
        const target = elmnt;
        let xA: number, yA: number, xB: number, yB: number;
  
        e.preventDefault();
  
        document.onmousemove = (e: MouseEvent) => {
          xA = xB - e.clientX;
          yA = yB - e.clientY;
  
          xB = e.clientX;
          yB = e.clientY;
  
          target.style.top = target.offsetTop - yA + "px";
          target.style.left = target.offsetLeft - xA + "px";

          app.pos.x = target.offsetLeft - xA;
          app.pos.y = target.offsetTop - yA;

          updateStores();
        };
  
        document.onmouseup = () => {
          document.onmouseup = null;
          document.onmousemove = null;
        };
  
        //toFront(elmnt);
      }
    });
  }