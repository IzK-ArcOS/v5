import { get } from "svelte/store";
import logo from "../../../assets/apps/lightsoff.svg";
import LightsOffSvelte from "../../../lib/Apps/LightsOff.svelte";
import type { App } from "../interface";
import { LOGrid } from "./LightsOff/grid";
import { LO_LEVEL, loadLevel } from "./LightsOff/grid/levels";

export const LightsOff: App = {
  info: {
    name: "Lights Off",
    description: "Turn off all the lights!",
    builtin: true,
    version: "1.0.0",
    author: "Tim Horton, ported to ArcOS by IzKuipers",
    hidden: false,
    icon: logo,
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
  events: {
    keyboardShortcuts: [
      {
        key: "o",
        alt: true,
        shift: true,
        ctrl: true,
        action: () => {
          console.log("next lo level");
          loadLevel(get(LO_LEVEL) + 1);
        },
      },
    ],
  },
};
