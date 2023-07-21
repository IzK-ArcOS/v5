import { writable } from "svelte/store";
import logo from "../../../assets/apps/donut.png";
import Donut from "../../../lib/Apps/Donut.svelte";
import { ArcOSVersion } from "../../env/main";
import { openChildWindow } from "../events";
import type { App } from "../interface";

export const DonutApp: App = {
  info: {
    name: "Donut",
    description: "A spinning ASCII donut",
    builtin: true,
    version: ArcOSVersion,
    author: "Andy Sloane (ArcOS port by IzK)",
    icon: logo,
    appGroup: "entertainment",
  },
  size: { w: 850, h: 520 },
  pos: { x: 30, y: 40 },
  minSize: { w: 850, h: 520 },
  maxSize: { w: 850, h: NaN },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
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
