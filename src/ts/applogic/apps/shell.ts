import logo from "../../../assets/systemIcon.svg";
import type { App } from "../interface";
import Shell from "../../../lib/Page/Desktop/Shell.svelte";

export const ArcShell: App = {
  info: {
    name: "ArcShell",
    description: "The ArcOS Shell",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: logo,
    custom: true,
  },
  size: { w: NaN, h: NaN },
  pos: { x: 0, y: 0 },
  minSize: { w: NaN, h: NaN },
  maxSize: { w: NaN, h: NaN },
  controls: { min: false, max: false, cls: false },
  state: {
    headless: true,
    resizable: false,
    windowState: { min: false, max: false, fll: true },
  },
  content: Shell,
  glass: false,
  events: {},
  disabledWarning: {
    title: "Limited functionality",
    message:
      "The ArcOS Shell is disabled, rendering the taskbar, start menu and action center unusable.<br><br>You can still access ArcFind using <b>Alt+Shift+S</b> or the Application Manager using <b>Alt+Shift+Z</b>.",
  },
};
