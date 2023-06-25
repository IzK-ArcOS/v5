import logo from "../../../assets/apps/default.svg";
import ExitSvelte from "../../../lib/Apps/Exit.svelte";
import type { App } from "../interface";

export const AppLauncher: App = {
  info: {
    name: "AppLauncher",
    description: "ArcOS.Shell.Launcher.AppLauncher",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: logo,
    hidden: true,
  },
  size: { w: NaN, h: NaN },
  pos: { x: 0, y: 0 },
  minSize: { w: NaN, h: NaN },
  maxSize: { w: NaN, h: NaN },
  controls: { min: false, max: false, cls: true },
  state: {
    headless: true,
    resizable: false,
    windowState: { min: false, max: false, fll: true },
  },
  content: ExitSvelte,
  glass: true,
};
