import { default as logo } from "../../../assets/apps/settings/desktop.svg";
import Wallpaper from "../../../lib/Page/Desktop/Wallpaper.svelte";
import { ArcOSVersion } from "../../env/main";
import type { App } from "../interface";
import { WallpaperContext } from "./wallpaper/context";

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
  contextMenu: WallpaperContext,
  core: true,
};
