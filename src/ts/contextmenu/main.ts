import { get } from "svelte/store";
import type { ContextMenuItem } from "../applogic/interface";
import { ProcessStore } from "../applogic/store";

export const SEP_ITEM = { sep: true };

const validCallerTags = [
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

export function getCallerScope(e: MouseEvent): HTMLDivElement {
  const p = e.composedPath() as HTMLDivElement[];

  for (let i = 0; i < p.length; i++) {
    const tag = p[i].tagName;

    if (!tag) continue;

    const caller = p[i].dataset.caller;

    if (validCallerTags.includes(tag.toLowerCase()) && caller) {
      return p[i];
    }
  }

  return null;
}

export function getContextEntry(
  pid: number,
  scope: string
): ContextMenuItem[] | false {
  const process = get(ProcessStore)[pid];

  if (!process || !process.app.contextMenu) return false;

  const menu = Object.entries(process.app.contextMenu);

  for (let i = 0; i < menu.length; i++) {
    if (scope.includes(menu[i][0])) return menu[i][1];
  }

  return false;
}
