import { get } from "svelte/store";
import { getWindowElement } from "../../window/main";
import { openWindow } from "../events";
import { getWindow, WindowStore } from "../store";
import type { SnapTriggerBounds } from "./interface";
import { draggingId, leftZoneTriggered, rightZoneTriggered } from "./store";

export function checkZones(x: number, y: number, id: string) {
  const gB = getBounds();
  const gW = getWindow(id);

  if (id.startsWith("error_")) return;

  const cF = gW.state.resizable || gW.controls.max;

  if (!gW || !gB) return;

  const l = gB.lTrig;
  const r = gB.rTrig;

  const isL = cF && x > l.xStart && x < l.xEnd && y > l.yStart && y < l.yEnd;
  const isR = cF && x > r.xStart && x < r.xEnd && y > r.yStart && y < r.yEnd;

  leftZoneTriggered.set(isL);
  rightZoneTriggered.set(isR);

  draggingId.set(isL || isR ? id : null);
}

export function getBounds(): SnapTriggerBounds | false {
  const [lTrig, rTrig, lZone, rZone] = getZoneElements();

  if (!lTrig || !rTrig || !lZone || !rZone) return false;

  const bWidth = document.body.offsetWidth;

  const data: SnapTriggerBounds = {
    lTrig: {
      xStart: lTrig.offsetLeft,
      xEnd: lTrig.offsetLeft + lTrig.offsetWidth,
      yStart: lTrig.offsetTop,
      yEnd: lTrig.offsetTop + lTrig.offsetHeight,
    },
    rTrig: {
      xStart: bWidth - rTrig.offsetWidth,
      xEnd: bWidth,
      yStart: rTrig.offsetTop,
      yEnd: rTrig.offsetTop + rTrig.offsetHeight,
    },
    lZone: {
      xStart: lZone.offsetLeft,
      xEnd: lZone.offsetLeft + lZone.offsetWidth,
      yStart: lZone.offsetTop,
      yEnd: lZone.offsetTop + lZone.offsetHeight,
    },
    rZone: {
      xStart: bWidth - rZone.offsetWidth,
      xEnd: bWidth,
      yStart: rZone.offsetTop,
      yEnd: rZone.offsetTop + rZone.offsetHeight,
    },
  };

  return data;
}

export function getZoneElements() {
  const lTrig = document.querySelector("div.snapzones #snapTriggerLeft");
  const rTrig = document.querySelector("div.snapzones #snapTriggerRight");
  const lZone = document.querySelector("div.snapzones #snapZoneLeft");
  const rZone = document.querySelector("div.snapzones #snapZoneRight");

  const arr = [lTrig, rTrig, lZone, rZone];

  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) return [null, null, null, null];
  }

  return arr as HTMLDivElement[];
}

export function snapWindow(id: string) {
  console.table({ id });
  const leftTriggered = get(leftZoneTriggered);
  const rightTriggered = get(rightZoneTriggered);

  if (leftTriggered || rightTriggered) draggingId.set(id);

  if (leftTriggered) snapLeft();
  if (rightTriggered) snapRight();
}

function snapLeft() {
  const [gB, id, wE] = getData();

  if (!wE || !gB) return;

  let [x, y, w, h] = [0, 0, 0, 0];

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    const W = ws[i];

    if (W.id == id) {
      W.pos.x = x = gB.lZone.xStart;
      W.pos.y = y = gB.lZone.yStart;
      W.size.w = w = gB.lZone.xEnd;
      W.size.h = h = gB.lZone.yEnd;

      W.snapped = true;
    }
  }

  WindowStore.set(ws);

  commitWindow(wE, x, y, w, h);
}

function getData(): [SnapTriggerBounds, string, HTMLDivElement] {
  const gB = getBounds() as SnapTriggerBounds;
  const id = get(draggingId);
  const wE = getWindowElement(getWindow(id));

  return [gB, id, wE];
}

function snapRight() {
  const [gB, id, wE] = getData();

  if (!wE || !gB) return;

  let [x, y, w, h] = [0, 0, 0, 0];

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    const W = ws[i];

    if (W.id == id) {
      W.pos.x = x = gB.rZone.xStart;
      W.pos.y = y = gB.rZone.yStart;
      W.size.w = w = gB.rZone.xEnd - gB.rZone.xStart;
      W.size.h = h = gB.rZone.yEnd - gB.rZone.yStart;

      W.snapped = true;
    }
  }

  WindowStore.set(ws);

  commitWindow(wE, x, y, w, h);
}

function commitWindow(
  window: HTMLDivElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  setTimeout(() => {
    window.style.left = x + "px";
    window.style.top = y + "px";
    window.style.width = w + "px";
    window.style.height = h + "px";

    openWindow(get(draggingId));
  }, 5);
}
