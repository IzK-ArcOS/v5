import { get, writable } from "svelte/store";
import Shell from "../../../lib/Page/Desktop/Shell.svelte";
import { Logo } from "../../branding";
import { ArcOSVersion } from "../../env/main";
import { UserData } from "../../userlogic/interfaces";
import type { App } from "../interface";
import { SEP_ITEM } from "../../contextmenu/main";

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
          const ud = get(UserData);

          ud.sh.taskbar.clockSecs = !ud.sh.taskbar.clockSecs;

          UserData.set(ud);
        },
        isActive: () => get(UserData).sh.taskbar.clockSecs,
      },
      {
        caption: "Show Date",
        action: () => {
          const ud = get(UserData);

          ud.sh.taskbar.clockDate = !ud.sh.taskbar.clockDate;

          UserData.set(ud);
        },
        isActive: () => get(UserData).sh.taskbar.clockDate,
      },
      SEP_ITEM,
      {
        caption: "12-hour clock",
        action: () => {
          const ud = get(UserData);

          ud.sh.taskbar.clock12hr = !ud.sh.taskbar.clock12hr;

          UserData.set(ud);
        },
        isActive: () => get(UserData).sh.taskbar.clock12hr,
      },
    ],
  },
  core: true,
};

export const showShellShade = writable<boolean>(false);
