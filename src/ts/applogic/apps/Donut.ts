import { writable } from "svelte/store";
import logo from "../../../assets/apps/donut.png";
import Donut from "../../../lib/Apps/Donut.svelte";
import { ArcOSVersion } from "../../env/main";
import type { App } from "../interface";

export const DonutApp: App = {
  info: {
    name: "Donut",
    description: "A spinning ASCII donut",
    builtin: true,
    version: ArcOSVersion,
    author: "Andy Sloane (ArcOS port by IzK)",
    icon: logo,
  },
  initialSize: { w: 850, h: 520 },
  minSize: { w: 850, h: 520 },
  maxSize: { w: 850, h: NaN },
  controls: { minimized: true, maximized: true, close: true },
  windowProperties: {
    headless: false,
    resizable: true,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
  content: Donut,
  glass: true,
  events: {
    open() {
      donutSpinning.set(true);
    },

    close() {
      donutSpinning.set(false);
    },

    blur() {
      donutSpinning.set(false);
    },

    focus() {
      donutSpinning.set(true);
    },
  },
};

export const donutSpinning = writable<boolean>(false);
