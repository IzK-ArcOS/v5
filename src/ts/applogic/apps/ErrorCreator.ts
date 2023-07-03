import logo from "../../../assets/apps/error.svg";
import ErrorCreatorSvelte from "../../../lib/Apps/ErrorCreator.svelte";
import { ArcOSVersion } from "../../env/main";
import type { App } from "../interface";

export const ErrorCreator: App = {
  info: {
    name: "Error Message Summoner",
    description: "Use for testing only -- error message creator",
    builtin: true,
    version: ArcOSVersion,
    author: "Izaak Kuipers",
    icon: logo,
    hidden: true,
  },
  initialSize: { w: 300, h: 267 },
  minSize: { w: 300, h: 253 },
  maxSize: { w: 300, h: 253 },
  controls: { minimized: true, maximized: false, close: true },
  windowProperties: {
    headless: false,
    resizable: false,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
  content: ErrorCreatorSvelte,
  glass: true,
};
