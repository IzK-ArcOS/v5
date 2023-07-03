import { writable } from "svelte/store";
import Shell from "../../../lib/Page/Desktop/Shell.svelte";
import { SEP_ITEM } from "../../contextmenu/main";
import { ArcOSVersion } from "../../env/main";
import { createProcess } from "../events";
import type { App } from "../interface";
import { openByKey } from "./SettingsApp/store";
import { Logo } from "../../branding";

export const ArcShell: App = {
  info: {
    name: "ArcShell",
    description: "The ArcOS Shell",
    builtin: true,
    version: ArcOSVersion,
    author: "ArcOS Team",
    icon: Logo(),
    custom: true,
  },
  initialSize: { w: NaN, h: NaN },
  minSize: { w: NaN, h: NaN },
  maxSize: { w: NaN, h: NaN },
  controls: { minimized: false, maximized: false, close: false },
  windowProperties: {
    headless: true,
    resizable: false,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: true },
  content: Shell,
  glass: false,
  events: {},
  contextMenu: {
    "shell-taskbar": [
      {
        caption: "Application Manager",
        action: () => {
          createProcess("AppMan");
        },
      },
      SEP_ITEM,
      {
        icon: "settings",
        caption: "Shell settings",
        action: () => {
          createProcess("SettingsApp");
          setTimeout(() => {
            openByKey("Shell");
          });
        },
      },
    ],
  },
  core: true,
};

export const showShellShade = writable<boolean>(false);
