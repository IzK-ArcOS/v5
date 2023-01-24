import { Log, LogLevel } from "../console";
import type { App, OverlayableApp } from "./interface";

export function generateCSS(app: App, usePos: boolean) {
  Log({
    msg: `Generating CSS for ${app.id}`,
    source: "css.ts: generateCSS",
    level: LogLevel.info,
  });

  let cssString = "";

  if (!app.state.windowState.max) {
    cssString += `min-width: ${app.minSize.w}px;`;
    cssString += `min-height: ${app.minSize.h}px;`;
    cssString += `max-width: ${app.maxSize.w}px;`;
    cssString += `max-height: ${app.maxSize.h}px;`;
    if (usePos) {
      cssString += `left: ${app.pos.x}px;`;
      cssString += `top: ${app.pos.y}px;`;
    }
    cssString += `width: ${app.size.w}px;`;
    cssString += `height: ${app.size.h}px;`;
  }

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
