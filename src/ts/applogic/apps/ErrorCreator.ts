import ErrorCreatorSvelte from "../../../lib/Apps/ErrorCreator.svelte";
import { ArcOSVersion } from "../../../ts/env/main";
import type { App } from "../interface";

export const ErrorCreator: App = {
  info: {
    name: "Testing - Error Creator",
    description: "Use for testing only -- error message creator",
    builtin: true,
    version: ArcOSVersion,
    author: "Izaak Kuipers",
  },
  size: { w: 300, h: 253 },
  pos: { x: 30, y: 40 },
  minSize: { w: 300, h: 253 },
  maxSize: { w: 300, h: 253 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false, cls: true },
  },
  content: ErrorCreatorSvelte,
  glass: true,
};
