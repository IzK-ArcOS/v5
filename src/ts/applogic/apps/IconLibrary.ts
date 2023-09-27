import IconLibrarySvelte from "../../../lib/Apps/IconLibrary.svelte";
import { IconLibraryIcon } from "../../icon/apps";
import type { App } from "../interface";

export const IconLibrary: App = {
  info: {
    name: "Icon Library",
    description: "View the icons in ArcOS",
    builtin: true,
    version: "0.0.1",
    author: "Izaak Kuipers",
    hidden: true,
    icon: IconLibraryIcon,
  },
  size: { w: 595, h: NaN },
  pos: { x: 30, y: 40 },
  minSize: { w: 500, h: 470 },
  maxSize: /* { w: 500, h: 480 } */ { w: NaN, h: NaN },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
  content: IconLibrarySvelte,
  glass: false,
};
