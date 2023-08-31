import updateIcon from "../../../assets/update.svg";
import UpdateNoticeSvelte from "../../../lib/Page/Desktop/UpdateNotice.svelte";
import { ArcOSVersion } from "../../env/main";
import type { App } from "../interface";

export const UpdateNotice: App = {
  info: {
    name: "Update Notice",
    description: "New update available!",
    builtin: true,
    version: ArcOSVersion,
    author: "ArcOS Team",
    icon: updateIcon,
    appGroup: "coreApps",
  },
  size: { w: NaN, h: NaN },
  pos: { x: 0, y: 0 },
  minSize: { w: NaN, h: NaN },
  maxSize: { w: NaN, h: NaN },
  controls: { min: false, max: false, cls: false },
  state: {
    headless: true,
    resizable: false,
    windowState: { min: false, max: false, fll: true },
  },
  content: UpdateNoticeSvelte,
  glass: false,
  events: {},
};
