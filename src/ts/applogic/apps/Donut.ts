import { writable } from "svelte/store";
import logo from "../../../assets/apps/donut.png";
import Donut from "../../../lib/Apps/Donut.svelte";
import { ArcOSVersion } from "../../../ts/env/main";
import { openChildWindow, openWindow } from "../events";
import type { App } from "../interface";
import { DonutDebugInfo } from "./Donut/debugInfo";

export const DonutApp: App = {
  info: {
    name: "Donut",
    description: "A spinning ASCII donut",
    builtin: true,
    version: ArcOSVersion,
    author: "Andy Sloane (ArcOS port by IzK)",
    icon: logo,
  },
  size: { w: 650, h: 460 },
  pos: { x: 30, y: 40 },
  minSize: { w: 650, h: 460 },
  maxSize: { w: 650, h: 460 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
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
  contextMenu: {
    "donut-target": [
      {
        caption: "View debug information",
        icon: "bug_report",
        action() {
          openChildWindow("DonutApp", "debugInfo");
        },
      },
    ],
  },
  children: {
    debugInfo: DonutDebugInfo,
  },
};

export const donutSpinning = writable<boolean>(false);
