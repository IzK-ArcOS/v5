import logo from "../../../assets/apps/logger.svg";
import Logger from "../../../lib/Apps/Logger.svelte";
import type { App } from "../interface";

export const LoggerApp: App = {
  info: {
    name: "System Logger",
    description: "All the ArcOS logs in one place",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: logo,
  },
  initialSize: { w: 900, h: 600 },
  minSize: { w: 900, h: 600 },
  maxSize: { w: 901, h: 601 },
  controls: { minimized: true, maximized: true, close: true },
  windowProperties: {
    headless: false,
    resizable: false,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
  content: Logger,
  glass: true,
};
