import TestAppSvelte from "../../../lib/Apps/TestApp.svelte";
import type { App } from "../interface";
import logo from "../../../assets/apps/testapp.svg";

export const TestApp: App = {
  info: {
    name: "TestApp",
    description: "First test application for ArcOS",
    builtin: true,
    version: "0.0.0",
    author: "Izaak Kuipers",
    icon: logo,
  },
  size: { w: 640, h: 480 },
  pos: { x: 30, y: 40 },
  minSize: { w: 400, h: 300 },
  maxSize: { w: 800, h: 600 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: TestAppSvelte,
  glass: true,
};
