import logo from "../../../assets/apps/lightsoff.svg";
import LightsOffSvelte from "../../../lib/Apps/LightsOff.svelte";
import type { App } from "../interface";
import { LightsOffRuntime } from "./LightsOff/runtime";

export const LightsOff: App = {
  info: {
    name: "Lights Off",
    description: "Turn off all the lights!",
    builtin: true,
    version: "1.0.0",
    author: "Tim Horton, ported to ArcOS by IzKuipers",
    hidden: false,
    icon: logo,
    appGroup: "entertainment",
  },
  size: { w: NaN, h: NaN },
  pos: { x: 80, y: 80 },
  minSize: { w: NaN, h: NaN },
  maxSize: { w: NaN, h: NaN },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: LightsOffSvelte,
  glass: true,
  events: {},
  runtime: LightsOffRuntime,
};
