import { get } from "svelte/store";
import { getWindowElement } from "../window/main";
import { generateCSS } from "./css";
import type { App, Process, Position } from "./interface";
import { AppStore, ProcessStore } from "./store";

export function centerWindow(pid: number) {
  const processStore = get(ProcessStore);

  processStore[pid].pos = calculatePos(pid);

  ProcessStore.set(processStore);
}

export function calculatePos(pid: number): Position & { centered: true } {
  const el = getWindowElement(pid);

  const windowWidth = el.offsetWidth;
  const windowHeight = el.offsetHeight;

  const screenWidth = document.body.offsetWidth;
  const screenHeight = document.body.offsetHeight;

  const x = (screenWidth - windowWidth) / 2;
  const y = (screenHeight - windowHeight) / 2;

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;

  return { x, y, centered: true };
}
