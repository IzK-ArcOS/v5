import type { ContextMenuItem } from "../applogic/interface";
import { getWindow } from "../applogic/store";

export const SEP_ITEM = { sep: true };

const validContexMenuTags = [
  "button",
  "div",
  "span",
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "img",
];

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

export function getContexMenuScope(e: MouseEvent): HTMLDivElement {
  const p = e.composedPath() as HTMLDivElement[];

  for (let i = 0; i < p.length; i++) {
    const tag = p[i].tagName;

    if (!tag) continue;

    const contextmenu = p[i].dataset.contextmenu;

    if (validContexMenuTags.includes(tag.toLowerCase()) && contextmenu) {
      return p[i];
    }
  }

  return null;
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
