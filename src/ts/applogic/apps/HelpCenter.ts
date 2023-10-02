import HelpCenterSvelte from "../../../lib/Apps/HelpCenter.svelte";
import { createOverlayableError } from "../../errorlogic/overlay";
import { HelpCenterIcon } from "../../icon/apps";
import type { App } from "../interface";

export const HelpCenter: App = {
  info: {
    name: "Help Center",
    description: "You have questions, I have answers.",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: HelpCenterIcon,
    hidden: true,
    appGroup: "support",
  },
  size: { w: 800, h: 600 },
  pos: { x: 30, y: 40 },
  minSize: { w: 800, h: 600 },
  maxSize: { w: 901, h: 700 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: HelpCenterSvelte,
  glass: true,
  events: {
    open() {
      createOverlayableError(
        {
          title: "Caution!",
          message:
            "This application is still in development past the release of 5.0.6. It was hidden to prevent you from seeing this half finished help center. Do not take the content or UI serious.",
          buttons: [{ caption: "OK", action() {}, suggested: true }],
        },
        "HelpCenter"
      );
    },
  },
};
