import logo from "../../../assets/apps/settings/desktop.svg";
import Wallpaper from "../../../lib/Page/Desktop/Wallpaper.svelte";
import type { App } from "../interface";

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
};
