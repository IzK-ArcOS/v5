import logo from "../../../assets/apps/2048.svg";
import TwentySvelte from "../../../lib/Apps/TwentySvelte.svelte";
import type { App } from "../interface";
import { TwentyRuntime } from "./TwentyFourtyEight/runtime";

export const TwentyFourtyEight: App = {
  info: {
    name: "2048",
    description: "the 2048-game in ArcOS",
    builtin: true,
    version: "1.0.0",
    author: "GuilhermeBohnstedt (ArcOS port by IzK)",
    icon: logo,
    appGroup: "entertainment",
  },
  size: { w: 354, h: NaN },
  pos: { x: 30, y: 40 },
  minSize: { w: 354, h: 436 },
  maxSize: { w: 354, h: 446 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: TwentySvelte,
  glass: true,
  runtime: TwentyRuntime,
};
