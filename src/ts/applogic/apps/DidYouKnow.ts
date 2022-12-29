import logo from "../../../assets/apps/didyouknow.svg";
import DidYouKnowSvelte from "../../../lib/Apps/DidYouKnow.svelte";
import type { App } from "../interface";

export const DidYouKnow: App = {
  info: {
    name: "Did you know?",
    description: "Handy dandy ArcOS tips",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    icon: logo,
  },
  size: { w: 362, h: 300 },
  pos: { x: 30, y: 40 },
  minSize: { w: 362, h: 300 },
  maxSize: { w: 362, h: 300 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: DidYouKnowSvelte,
  glass: false,
};
