import type { ContextMenuItem } from "../applogic/interface";
import { getWindow } from "../applogic/store";

export function composePosition(
  e: MouseEvent,
  mW: number,
  mH: number
): [number, number] {
  const desktop = document.querySelectorAll(
    "div.app > div.desktop"
  )[0] as HTMLDivElement;

  if (!desktop) return;

  const dW = desktop.offsetWidth;
  const dH = desktop.offsetHeight;

  let x = e.clientX;
  let y = e.clientY;

  if (x + mW > dW) x = dW - mW;
  if (y + mH > dH) y = dH - mH;
  if (x < 0) x = 0;
  if (y < 0) y = 0;

  return [x, y];
}

export function getComposedClassName(e: MouseEvent) {
  const p = e.composedPath() as HTMLDivElement[];

  let lastClass = "";

  for (let i = 0; i < p.length; i++) {
    const tag = p[i].tagName;

    if (!tag) continue;

    if (tag.toLowerCase() == "button") {
      lastClass = p[i].className.split(" ").join(".");

      break;
    }
  }

  return lastClass;
}

export function getScopedElement(parent: HTMLElement, childQuery: string) {
  if (childQuery == ".") return undefined;

  const p = parent.querySelector(childQuery) as HTMLButtonElement;

  if (!p) return undefined;

  return p;
}

export function getContextEntry(
  windowId: string,
  scope: string
): ContextMenuItem[] | false {
  const window = getWindow(windowId);

  if (!window || !window.contextMenu) return false;

  const menu = Object.entries(window.contextMenu);

  for (let i = 0; i < menu.length; i++) {
    if (scope.includes(menu[i][0])) return menu[i][1];
  }

  return false;
}
