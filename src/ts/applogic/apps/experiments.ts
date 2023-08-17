import logo from "../../../assets/update.svg";
import Experiments from "../../../lib/Apps/Experiments.svelte";
import type { App } from "../interface";

export const ExperimentsApp: App = {
  info: {
    name: "Experiments",
    description: "Spooky scary experiments",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    icon: logo,
    hidden: true,
  },
  size: { w: 500, h: 640 },
  pos: { x: 30, y: 40 },
  minSize: { w: 500, h: 640 },
  maxSize: { w: 500, h: 640 },
  controls: { min: false, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: Experiments,
  glass: false,
};
