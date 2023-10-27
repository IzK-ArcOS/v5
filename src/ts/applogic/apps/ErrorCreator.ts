import ErrorCreatorSvelte from "../../../lib/Apps/ErrorCreator.svelte";
import { ArcOSVersion } from "../../env/main";
import { ErrorIcon } from "../../icon/apps";
import type { App } from "../interface";

export const ErrorCreator: App = {
  info: {
    name: "Error Message Summoner",
    description: "Use for testing only -- error message creator",
    builtin: true,
    version: ArcOSVersion,
    author: "Izaak Kuipers",
    icon: ErrorIcon,
    hidden: true,
  },
  size: { w: 300, h: 267 },
  pos: { x: 30, y: 40 },
  minSize: { w: 300, h: 253 },
  maxSize: { w: 300, h: 253 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: ErrorCreatorSvelte,
  glass: true,
};
