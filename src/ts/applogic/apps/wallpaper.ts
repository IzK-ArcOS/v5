import { get } from "svelte/store";
import logo from "../../../assets/apps/settings/desktop.svg";
import Wallpaper from "../../../lib/Page/Desktop/Wallpaper.svelte";
import { SEP_ITEM } from "../../contextmenu/main";
import { restart, shutdown } from "../../desktop/power";
import { ArcOSVersion } from "../../env/main";
import { UserData } from "../../userlogic/interfaces";
import { openWindow } from "../events";
import type { App } from "../interface";
import { openByKey } from "./SettingsApp/store";

export const DesktopWallpaper: App = {
  info: {
    name: "Wallpaper",
    description: "The ArcOS wallpaper",
    builtin: true,
    version: ArcOSVersion,
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
  content: Wallpaper,
  glass: false,
  events: {},
  contextMenu: {
    "shell-wallpaper": [
      {
        caption: "Toggle desktop icons",
        action: () => {
          const udata = get(UserData);

          udata.sh.desktop.icons = !udata.sh.desktop.icons;

          UserData.set(udata);
        },
        icon: "apps",
      },
      SEP_ITEM,
      {
        caption: "File Manager",
        action: () => {
          openWindow("FileManager");
        },
        icon: "folder",
      },
      {
        caption: "Application Manager",
        action: () => {
          openWindow("AppMan");
        },
        icon: "widgets",
      },
      {
        caption: "App settings",
        action: () => {
          openByKey("Apps");
        },
        icon: "settings",
      },
      SEP_ITEM,
      {
        caption: "Shut down",
        action: shutdown,
        icon: "power_settings_new",
      },
      {
        caption: "Restart",
        action: restart,
        icon: "refresh",
      },
      SEP_ITEM,
      {
        caption: "Personalize",
        action: () => {
          openByKey("Appearance");
        },
        icon: "palette",
      },
    ],
  },
};
