import logo from "../../../assets/systemIcon.svg";
import Shell from "../../../lib/Page/Desktop/Shell.svelte";
import { SEP_ITEM } from "../../contextmenu/main";
import { openWindow } from "../events";
import type { App } from "../interface";
import { openByKey } from "./SettingsApp/store";

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
  contextMenu: {
    "shell-taskbar": [
      {
        caption: "Application Manager",
        action: () => {
          openWindow("AppMan");
        },
      },
      SEP_ITEM,
      {
        icon: "settings",
        caption: "Shell settings",
        action: () => {
          openWindow("SettingsApp");
          setTimeout(() => {
            openByKey("Shell");
          });
        },
      },
    ],
  },
};
