import { writable } from "svelte/store";
import logo from "../../../../assets/apps/donut.png";
import { ArcOSVersion } from "../../../../ts/env/main";
import type { App } from "../../interface";
import DebugInfo from "../../../../lib/Apps/Donut/children/debugInfo.svelte";

export const DonutDebugInfo: App = {
  info: {
    name: "Donut Debugger",
    description: "The donut debugger",
    builtin: true,
    version: ArcOSVersion,
    author: "Izaak Kuipers",
    icon: logo,
  },
  size: { w: 300, h: 420 },
  pos: { x: 60, y: 70 },
  minSize: { w: 300, h: 420 },
  maxSize: { w: 300, h: 420 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: DebugInfo,
  glass: false,
  parentId: "DonutApp",
};

export const donutSpinning = writable<boolean>(false);
