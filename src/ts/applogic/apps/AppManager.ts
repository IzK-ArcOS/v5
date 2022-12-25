import AppManagerSvelte from "../../../lib/Apps/AppManager.svelte";
import type { App } from "../interface";
import logo from "../../../assets/apps/appmanager.svg";

export const AppManager: App = {
  info: {
    name: "Application Manager",
    description: "Manage Open Apps",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    icon: logo,
  },
  size: { w: 500, h: 600 },
  pos: { x: 30, y: 40 },
  minSize: { w: 500, h: 600 },
  maxSize: { w: 500, h: 600 },
  controls: { min: false, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: AppManagerSvelte,
  glass: false,
};
