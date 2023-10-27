import Logger from "../../../lib/Apps/Logger.svelte";
import { LoggerIcon } from "../../icon/apps";
import type { App } from "../interface";

export const LoggerApp: App = {
  info: {
    name: "System Logger",
    description: "All the ArcOS logs in one place",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: LoggerIcon,
    appGroup: "systemTools",
  },
  size: { w: 900, h: 600 },
  pos: { x: 30, y: 40 },
  minSize: { w: 900, h: 600 },
  maxSize: { w: 901, h: 601 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: Logger,
  glass: true,
};
