import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import type { App, OverlayableApp } from "./interface";
import { ProcessStore, focusedProcessPid, maxZIndex } from "./store";

export function generateCSS(pid: number, usePos: boolean) {
  const process = get(ProcessStore)[pid];

  let cssString = "";
  /* 
  if (!app.state.windowState.max) { */
  cssString += `min-width: ${process.app.minSize.w}px;`;
  cssString += `min-height: ${process.app.minSize.h}px;`;
  cssString += `max-width: ${process.app.maxSize.w}px;`;
  cssString += `max-height: ${process.app.maxSize.h}px;`;
  if (usePos) {
    cssString += `left: ${process.pos.x}px;`;
    cssString += `top: ${process.pos.y}px;`;
  }
  cssString += `width: ${process.app.initialSize.w}px;`;
  cssString += `height: ${process.app.initialSize.h}px;`;
  /*   } */

  return cssString;
}

export function generateOverlayCSS(app: OverlayableApp) {
  let cssString = "";

  cssString += `min-width: ${app.size.w}px;`;
  cssString += `min-height: ${app.size.h}px;`;
  cssString += `max-width: ${app.size.w}px;`;
  cssString += `max-height: ${app.size.h}px;`;
  cssString += `width: ${app.size.w}px;`;
  cssString += `height: ${app.size.h}px;`;

  return cssString;
}
