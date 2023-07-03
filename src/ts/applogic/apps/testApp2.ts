import logo from "../../../assets/apps/testapp.svg";
import TestApp2 from "../../../lib/Apps/TestApp2.svelte";
import type { App } from "../interface";

export const UITester: App = {
  info: {
    name: "User Interface Troubleshooter",
    description: "Test the UI",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    icon: logo,
    hidden: true,
  },
  initialSize: { w: 640, h: 480 },
  minSize: { w: 640, h: 300 },
  maxSize: { w: 800, h: 600 },
  controls: { minimized: true, maximized: true, close: true },
  windowProperties: {
    headless: false,
    resizable: false,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
  content: TestApp2,
  glass: true,
};
