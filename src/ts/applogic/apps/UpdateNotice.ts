import UpdateNoticeSvelte from "../../../lib/Page/Desktop/UpdateNotice.svelte";
import ChangeLog from "../../../lib/Page/Desktop/UpdateNotice/overlays/ChangeLog.svelte";
import { ArcOSVersion } from "../../env/main";
import { UpdateIcon } from "../../icon/main";
import type { App } from "../interface";

export const UpdateNotice: App = {
  info: {
    name: "Update Notice",
    description: "New update available!",
    builtin: true,
    version: ArcOSVersion,
    author: "ArcOS Team",
    icon: UpdateIcon,
    appGroup: "coreApps",
    hidden: true,
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
  overlays: {
    changeLog: {
      info: {
        name: "Changelog",
        author: "ArcOS Team",
        version: ArcOSVersion,
      },
      size: { w: 600, h: 400 },
      show: false,
      content: ChangeLog,
    },
  },
};
