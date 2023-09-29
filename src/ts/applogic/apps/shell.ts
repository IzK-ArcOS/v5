import { get, writable } from "svelte/store";
import Shell from "../../../lib/Page/Desktop/Shell.svelte";
import { Logo } from "../../branding";
import { SEP_ITEM } from "../../contextmenu/main";
import { ArcOSVersion } from "../../env/main";
import { AppManIcon } from "../../icon/apps";
import { UserData } from "../../userlogic/interfaces";
import { openWindow } from "../events";
import type { App } from "../interface";
import { openByKey } from "./SettingsApp/store";

export const ArcShell: App = {
  info: {
    name: "ArcShell",
    description: "The ArcOS Shell",
    builtin: true,
    version: ArcOSVersion,
    author: "ArcOS Team",
    icon: Logo(),
    custom: true,
    appGroup: "coreApps",
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
  contextMenu: {
    clockcontext: [
      {
        caption: "Show Seconds",
        action: () => {
          UserData.update((udata) => {
            udata.sh.taskbar.clockSecs = !udata.sh.taskbar.clockSecs;

            return udata;
          });
        },
        isActive: () => get(UserData).sh.taskbar.clockSecs,
        icon: "av_timer",
      },
      {
        caption: "Show Date",
        action: () => {
          UserData.update((udata) => {
            udata.sh.taskbar.clockDate = !udata.sh.taskbar.clockDate;

            return udata;
          });
        },
        isActive: () => get(UserData).sh.taskbar.clockDate,
        icon: "calendar_month",
      },
      {
        caption: "12-hour clock",
        action: () => {
          UserData.update((udata) => {
            udata.sh.taskbar.clock12hr = !udata.sh.taskbar.clock12hr;

            return udata;
          });
        },
        isActive: () => get(UserData).sh.taskbar.clock12hr,
      },
      SEP_ITEM,
      {
        image: AppManIcon,
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
    "shell-taskbar": [
      {
        image: AppManIcon,
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
  core: true,
};

export const showShellShade = writable<boolean>(false);
