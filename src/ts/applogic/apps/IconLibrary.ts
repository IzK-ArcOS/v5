import IconLibrarySvelte from "../../../lib/Apps/IconLibrary.svelte";
import { AppsIcon } from "../../icon/general";
import type { App } from "../interface";

export const IconLibrary: App = {
  info: {
    name: "Icon Library",
    description: "View the icons in ArcOS",
    builtin: true,
    version: "0.0.1",
    author: "Izaak Kuipers",
    hidden: true,
    icon: AppsIcon,
  },
  size: { w: 595, h: NaN },
  pos: { x: 30, y: 40 },
  minSize: { w: 500, h: 470 },
  maxSize: { w: 500, h: 480 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: IconLibrarySvelte,
  glass: false,
};
