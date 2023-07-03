import { get } from "svelte/store";
import { getWindowElement } from "../../window/main";
import { createProcess } from "../events";
import { AppStore, ProcessStore } from "../store";
import type { SnapTriggerBounds } from "./interface";
import { draggingPid, leftZoneTriggered, rightZoneTriggered } from "./store";

export function checkZones(x: number, y: number, pid: number) {
  const bounds = getBounds();
  const process = get(ProcessStore)[pid];

  // if (pid.startsWith("error_")) return;

  const isResizable = process.app.windowProperties.resizable || process.app.controls.maximized;

  if (!process || !bounds) return;

  const l = bounds.lTrig;
  const r = bounds.rTrig;

  const isL = isResizable && x > l.xStart && x < l.xEnd && y > l.yStart && y < l.yEnd;
  const isR = isResizable && x > r.xStart && x < r.xEnd && y > r.yStart && y < r.yEnd;

  leftZoneTriggered.set(isL);
  rightZoneTriggered.set(isR);

  draggingPid.set(isL || isR ? pid : null);
}

export function getBounds(): SnapTriggerBounds | null {
  const [lTrig, rTrig, lZone, rZone] = getZoneElements();

  if (!lTrig || !rTrig || !lZone || !rZone) return null;

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

export function snapWindow(pid: number) {
  const leftTriggered = get(leftZoneTriggered);
  const rightTriggered = get(rightZoneTriggered);

  if (leftTriggered || rightTriggered) draggingPid.set(pid);

  if (leftTriggered) snapLeft();
  if (rightTriggered) snapRight();
}

function snapLeft() {
  const [bounds, pid, windowElement] = getData();

  if (!windowElement || !bounds) return;

  let [x, y, w, h] = [0, 0, 0, 0];

  const processStore = get(ProcessStore);

  processStore[pid].pos.x = x = bounds.lZone.xStart;
  processStore[pid].pos.y = y = bounds.lZone.yStart;
  processStore[pid].size.w = w = bounds.lZone.xEnd;
  processStore[pid].size.h = h = bounds.lZone.yEnd;

  processStore[pid].snapped = true;

  ProcessStore.set(processStore);

  commitWindow(windowElement, x, y, w, h);
}

function getData(): [SnapTriggerBounds, number, HTMLDivElement] {
  const bounds = getBounds() as SnapTriggerBounds;
  const pid = get(draggingPid);
  const windowElement = getWindowElement(pid);

  return [bounds, pid, windowElement];
}

function snapRight() {
  const [bounds, pid, windowElement] = getData();

  if (!windowElement || !bounds) return;

  let [x, y, w, h] = [0, 0, 0, 0];

  const processStore = get(ProcessStore);

  processStore[pid].pos.x = x = bounds.rZone.xStart;
  processStore[pid].pos.y = y = bounds.rZone.yStart;
  processStore[pid].size.w = w = bounds.rZone.xEnd - bounds.rZone.xStart;
  processStore[pid].size.h = h = bounds.rZone.yEnd - bounds.rZone.yStart;

  processStore[pid].snapped = true;

  ProcessStore.set(processStore);

  commitWindow(windowElement, x, y, w, h);
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

    // createProcess(get(draggingPid));
  }, 5);
}
