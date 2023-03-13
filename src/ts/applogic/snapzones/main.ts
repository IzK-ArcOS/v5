import { get } from "svelte/store";
import { getWindowElement } from "../../window/main";
import { openWindow } from "../events";
import { getWindow, WindowStore } from "../store";
import type { SnapTriggerBounds } from "./interface";
import { draggingId, leftZoneTriggered, rightZoneTriggered } from "./store";

export function checkZones(x: number, y: number, windowId: string) {
  const bounds = getBounds();
  const app = getWindow(windowId);

  const canFit = app.state.resizable || app.controls.max;

  if (!app) return;
  if (!bounds) return;

  const l = bounds.lTrig;
  const r = bounds.rTrig;

  const isLeft =
    canFit && x > l.xStart && x < l.xEnd && y > l.yStart && y < l.yEnd;
  const isRight =
    canFit && x > r.xStart && x < r.xEnd && y > r.yStart && y < r.yEnd;

  leftZoneTriggered.set(isLeft);
  rightZoneTriggered.set(isRight);

  draggingId.set(isLeft || isRight ? windowId : null);
}

export function getBounds(): SnapTriggerBounds | false {
  const [lTrig, rTrig, lZone, rZone] = getZoneElements();

  if (!lTrig || !rTrig || !lZone || !rZone) return false;

  const data: SnapTriggerBounds = {
    lTrig: {
      xStart: lTrig.offsetLeft,
      xEnd: lTrig.offsetLeft + lTrig.offsetWidth,
      yStart: lTrig.offsetTop,
      yEnd: lTrig.offsetTop + lTrig.offsetHeight,
    },
    rTrig: {
      xStart: document.body.offsetWidth - rTrig.offsetWidth,
      xEnd: document.body.offsetWidth,
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
      xStart: document.body.offsetWidth - rZone.offsetWidth,
      xEnd: document.body.offsetWidth,
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

  if (!lTrig || !rTrig || !lZone || !rZone) return [null, null, null, null];

  return [lTrig, rTrig, lZone, rZone] as HTMLDivElement[];
}

export function snapWindow(id: string) {
  const leftTriggered = get(leftZoneTriggered);
  const rightTriggered = get(rightZoneTriggered);

  if (leftTriggered || rightTriggered) draggingId.set(id);

  if (leftTriggered) snapLeft();
  if (rightTriggered) snapRight();
}

function snapLeft() {
  const bounds = getBounds();
  const snapId = get(draggingId);
  const window = getWindowElement(getWindow(snapId));

  if (!window) return;
  if (!bounds) return;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == snapId) {
      ws[i].pos.x = bounds.lZone.xStart;
      ws[i].pos.y = bounds.lZone.yStart;
      ws[i].size.w = bounds.lZone.xEnd;
      ws[i].size.h = bounds.lZone.yEnd;
      ws[i].snapped = true;
    }
  }

  WindowStore.set(ws);

  setTimeout(() => {
    window.style.left = bounds.lZone.xStart + "px";
    window.style.top = bounds.lZone.yStart + "px";
    openWindow(snapId);
  });
}

function snapRight() {
  const bounds = getBounds();
  const snapId = get(draggingId);
  const window = getWindowElement(getWindow(snapId));

  if (!window) return;
  if (!bounds) return;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == snapId) {
      ws[i].pos.x = bounds.rZone.xStart;
      ws[i].pos.y = bounds.rZone.yStart;
      ws[i].size.w = bounds.rZone.xEnd - bounds.rZone.xStart;
      ws[i].size.h = bounds.rZone.yEnd - bounds.rZone.yStart;
      ws[i].snapped = true;
    }
  }

  WindowStore.set(ws);

  setTimeout(() => {
    window.style.left = bounds.rZone.xStart + "px";
    window.style.top = bounds.rZone.yStart + "px";
    openWindow(snapId);
  });
}
