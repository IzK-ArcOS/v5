import Qlorb from "../../../lib/Apps/Qlorb.svelte";
import { QlorbIcon } from "../../icon/apps";
import type { App } from "../interface";
import { QlorbRuntime } from "./Qlorb/runtime";

export const QlorbApp: App = {
  info: {
    name: "Qlorb",
    description: "Click on flying orbs",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    icon: QlorbIcon,
    hidden: false,
    appGroup: "entertainment",
  },
  size: { w: 890, h: NaN },
  pos: { x: 100, y: 100 },
  minSize: { w: 890, h: 600 },
  maxSize: { w: 1200, h: NaN },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
  runtime: QlorbRuntime,
  content: Qlorb,
  glass: true,
};
