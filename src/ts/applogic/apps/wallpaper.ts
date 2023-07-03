import { get } from "svelte/store";
import logo from "../../../assets/apps/settings/desktop.svg";
import fileManager from "../../../assets/apps/filemanager.svg";
import appMan from "../../../assets/apps/appmanager.svg";
import appSettings from "../../../assets/apps/settings/apps.svg";
import appearance from "../../../assets/apps/settings/personalization.svg";
import Wallpaper from "../../../lib/Page/Desktop/Wallpaper.svelte";
import { SEP_ITEM } from "../../contextmenu/main";
import { restart, shutdown } from "../../desktop/power";
import { ArcOSVersion } from "../../env/main";
import { UserData } from "../../userlogic/interfaces";
import { createProcess } from "../events";
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
  initialSize: { w: NaN, h: NaN },
  minSize: { w: NaN, h: NaN },
  maxSize: { w: NaN, h: NaN },
  controls: { minimized: false, maximized: false, close: false },
  windowProperties: {
    headless: true,
    resizable: false,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: true },
  content: Wallpaper,
  glass: false,
  events: {},
  contextMenu: {
    "shell-wallpaper": [
      {
        caption: "Show desktop icons",
        action: () => {
          const udata = get(UserData);

          udata.sh.desktop.icons = !udata.sh.desktop.icons;

          UserData.set(udata);
        },
        icon: "apps",
        isActive: () => get(UserData).sh.desktop.icons,
      },
      SEP_ITEM,
      {
        caption: "File Manager",
        action: () => {
          createProcess("FileManager");
        },
        image: fileManager,
      },
      {
        caption: "Application Manager",
        action: () => {
          createProcess("AppMan");
        },
        image: appMan,
      },
      {
        caption: "App settings",
        action: () => {
          openByKey("Apps");
        },
        image: appSettings,
      },
      SEP_ITEM,
      {
        caption: "Shut down",
        action: shutdown,
        icon: "power_settings_new",
      },
      {
        caption: "Restart",
        action: () => restart(false),
        icon: "refresh",
      },
      SEP_ITEM,
      {
        caption: "Personalize",
        action: () => {
          openByKey("Appearance");
        },
        image: appearance,
      },
    ],
  },
  core: true,
};
