import LightsOffSvelte from "../../../lib/Apps/LightsOff.svelte";
import { LightsOffIcon } from "../../icon/apps";
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
    icon: LightsOffIcon,
    appGroup: "entertainment",
  },
  size: { w: 442, h: NaN },
  pos: { x: 80, y: 80 },
  minSize: { w: 442, h: 525 },
  maxSize: { w: 442, h: 535 },
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
