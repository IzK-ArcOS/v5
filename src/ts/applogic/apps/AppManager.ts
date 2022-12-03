import AppManagerSvelte from "../../../lib/Apps/AppManager.svelte";
import TestAppSvelte from "../../../lib/Apps/TestApp.svelte";
import type { App } from "../interface";

export const AppManager: App = {
  info: {
    name: "Application Manager",
    description: "Manage Open Apps",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
  },
  size: { w: 400, h: 250 },
  pos: { x: 30, y: 40 },
  minSize: { w: 400, h: 250 },
  maxSize: { w: 400, h: 250 },
  controls: { min: false, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false, cls: true },
  },
  content: AppManagerSvelte,
  glass: false,
};
