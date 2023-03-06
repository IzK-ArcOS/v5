import type { ContextMenuItem } from "../applogic/interface";
import { getWindow } from "../applogic/store";

const validCallerTags = ["button", "div", "span"];

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

export function getCallerScope(e: MouseEvent): string {
  const p = e.composedPath() as HTMLDivElement[];

  let lastClass = "";

  for (let i = 0; i < p.length; i++) {
    const tag = p[i].tagName;

    if (!tag) continue;

    const caller = p[i].dataset.caller;

    if (validCallerTags.includes(tag.toLowerCase()) && caller) {
      lastClass = caller;

      break;
    }
  }

  return lastClass;
}

export function getScopedElement(parent: HTMLElement, childCaller: string) {
  if (!childCaller) return undefined;

  const p = parent.querySelector(
    `*[data-caller="${childCaller}"`
  ) as HTMLButtonElement;

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
