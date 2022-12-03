import ExitSvelte from "../../../lib/Apps/Exit.svelte";
import type { App } from "../interface";

export const Exit: App = {
  info: {
    name: "Exit",
    description: "ArcOS Exit Menu",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
  },
  size: { w: 280, h: 50 },
  pos: { x: 30, y: 40 },
  minSize: { w: 280, h: 50 },
  maxSize: { w: 280, h: 50 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: true,
    resizable: false,
    windowState: { min: false, max: false, fll: false, cls: true },
  },
  content: ExitSvelte,
  glass: true,
};
