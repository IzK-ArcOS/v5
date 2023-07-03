import logo from "../../../assets/apps/arcterm.svg";
import ArcTermSvelte from "../../../lib/Apps/ArcTerm.svelte";
import { toggleWindowFullscreenization } from "../events";
import type { App } from "../interface";

export const ArcTerm: App = {
  info: {
    name: "ArcTerm",
    description: "ArcOS Terminal",
    builtin: true,
    version: "2.0.0",
    author: "ArcOS Team",
    icon: logo,
  },
  initialSize: { w: 640, h: 480 },
  minSize: { w: 350, h: 250 },
  maxSize: { w: NaN, h: NaN },
  controls: { minimized: true, maximized: true, close: true },
  windowProperties: {
    headless: false,
    resizable: true,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
  content: ArcTermSvelte,
  glass: true,
  events: {
    keyboardShortcuts: [
      {
        alt: true,
        shift: true,
        key: "f",
        action(pid: number) {
          toggleWindowFullscreenization(pid);
        },
      },
    ],
  },
};
