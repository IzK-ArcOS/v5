import TestAppSvelte from "../../../lib/Apps/TestApp.svelte";
import type { App } from "../interface";

export const TestApp: App = {
  info: {
    name: "TestApp",
    description: "First test application for ArcOS",
    builtin: true,
    version: "0.0.0",
    author: "Izaak Kuipers",
  },
  size: { w: 400, h: 300 },
  pos: { x: 30, y: 40 },
  minSize: { w: 200, h: 200 },
  maxSize: { w: 800, h: 600 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
  content: TestAppSvelte,
};
