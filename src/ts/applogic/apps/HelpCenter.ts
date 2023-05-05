import logo from "../../../assets/apps/helpcenter.svg";
import HelpCenterSvelte from "../../../lib/Apps/HelpCenter.svelte";
import type { App } from "../interface";

export const HelpCenter: App = {
  info: {
    name: "Help Center",
    description: "You have questions, I have answers.",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: logo,
  },
  size: { w: 800, h: 600 },
  pos: { x: 30, y: 40 },
  minSize: { w: 800, h: 600 },
  maxSize: { w: 901, h: 700 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: HelpCenterSvelte,
  glass: true,
};
