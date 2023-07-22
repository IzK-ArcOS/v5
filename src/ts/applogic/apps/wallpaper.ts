import { get } from "svelte/store";
import appMan from "../../../assets/apps/appmanager.svg";
import fileManager from "../../../assets/apps/filemanager.svg";
import appSettings from "../../../assets/apps/settings/apps.svg";
import {
  default as desktopIcon,
  default as logo,
} from "../../../assets/apps/settings/desktop.svg";
import appearance from "../../../assets/apps/settings/personalization.svg";
import themesIcon from "../../../assets/apps/settings/themes.svg";
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
          openWindow("FileManager");
        },
        image: fileManager,
      },
      {
        caption: "Application Manager",
        action: () => {
          openWindow("AppMan");
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
        caption: "Themes",
        action: () => {
          openByKey("Themes");
        },
        image: themesIcon,
      },
      {
        caption: "Wallpaper",
        action: () => {
          openByKey("Wallpaper");
        },
        image: desktopIcon,
      },
      {
        caption: "Visuals",
        action: () => {
          openByKey("Visuals");
        },
        image: appearance,
      },
    ],
  },
  core: true,
};
