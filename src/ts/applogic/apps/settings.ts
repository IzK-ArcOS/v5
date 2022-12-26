import type { App } from "../interface";
import logo from "../../../assets/apps/settings.svg";
import SettingsAppSvelte from "../../../lib/Apps/SettingsApp.svelte";

export const SettingsApp: App = {
  info: {
    name: "System Settings",
    description: "Manage your ArcOS installation",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: logo,
  },
  size: { w: 640, h: 480 },
  pos: { x: 30, y: 40 },
  minSize: { w: 400, h: 300 },
  maxSize: { w: 800, h: 600 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: SettingsAppSvelte,
  glass: true,
};
