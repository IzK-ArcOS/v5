import logo from "../../../assets/apps/arcterm.svg";
import ArcTermSvelte from "../../../lib/Apps/ArcTerm.svelte";
import { fullscreenToggle } from "../events";
import type { App } from "../interface";

export const ArcTerm: App = {
  info: {
    name: "ArcTerm",
    description: "ArcOS Terminal",
    builtin: true,
    version: "2.0.0",
    author: "ArcOS Team",
    icon: logo,
    preloaded: true,
  },
  size: { w: 640, h: 480 },
  pos: { x: 60, y: 60 },
  minSize: { w: 350, h: 250 },
  maxSize: { w: NaN, h: NaN },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
  content: ArcTermSvelte,
  glass: true,
  events: {
    keyboardShortcuts: [
      {
        alt: true,
        shift: true,
        key: "f",
        action(app: App) {
          fullscreenToggle(app.id);
        },
      },
    ],
  },
};
