import logo from "../../../assets/apps/calculator.svg";
import Calculator from "../../../lib/Apps/Calculator.svelte";
import DidYouKnowSvelte from "../../../lib/Apps/DidYouKnow.svelte";
import type { App } from "../interface";

export const CaclulatorApp: App = {
  info: {
    name: "Calculator",
    description: "ArcOS Calculator",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    icon: logo,
  },
  size: { w: 400, h: 350 },
  pos: { x: 60, y: 60 },
  minSize: { w: 400, h: 300 },
  maxSize: { w: 400, h: 300 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: Calculator,
  glass: true,
};
