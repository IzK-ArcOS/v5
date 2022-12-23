import TestApp2 from "../../../lib/Apps/TestApp2.svelte";
import type { App } from "../interface";

export const UITester: App = {
  info: {
    name: "UI Tester",
    description: "Test the UI",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
  },
  size: { w: 640, h: 480 },
  pos: { x: 30, y: 40 },
  minSize: { w: 640, h: 300 },
  maxSize: { w: 800, h: 600 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: TestApp2,
  glass: true,
};
