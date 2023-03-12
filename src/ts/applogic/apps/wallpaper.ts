import logo from "../../../assets/apps/settings/desktop.svg";
import Wallpaper from "../../../lib/Page/Desktop/Wallpaper.svelte";
import { SEP_ITEM } from "../../contextmenu/main";
import { openWindow } from "../events";
import type { App } from "../interface";
import { openByKey } from "./SettingsApp/store";

export const DesktopWallpaper: App = {
  info: {
    name: "Wallpaper",
    description: "The ArcOS wallpaper",
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
  content: Wallpaper,
  glass: false,
  events: {},
  contextMenu: {
    "shell-wallpaper": [
      {
        caption: "File Manager",
        action: () => {
          openWindow("FileManager");
        },
      },
      SEP_ITEM,
      {
        caption: "App settings",
        action: () => {
          openByKey("Apps");
        },
      },
      {
        caption: "Application Manager",
        action: () => {
          openWindow("AppMan");
        },
      },
      SEP_ITEM,
      {
        caption: "Shut down...",
        action: () => {
          openWindow("Exit");
        },
        icon: "power_settings_new",
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
