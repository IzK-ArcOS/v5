import logo from "@assets/apps/error.svg";
import ErrorCreatorSvelte from "../../../lib/Apps/ErrorCreator.svelte";
import { ArcOSVersion } from "$$ts/env/main";
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
