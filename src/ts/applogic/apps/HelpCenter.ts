import logo from "../../../assets/apps/helpcenter.svg";
import HelpCenterSvelte from "../../../lib/Apps/HelpCenter.svelte";
import { createOverlayableError } from "../../errorlogic/overlay";
import type { App } from "../interface";
import { getPID } from "../pid";

export const HelpCenter: App = {
  info: {
    name: "Help Center",
    description: "You have questions, I have answers.",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: logo,
    hidden: true,
  },
  initialSize: { w: 800, h: 600 },
  minSize: { w: 800, h: 600 },
  maxSize: { w: 901, h: 700 },
  controls: { minimized: true, maximized: true, close: true },
  windowProperties: {
    headless: false,
    resizable: false,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
  content: HelpCenterSvelte,
  glass: true,
  events: {
    open() {
      createOverlayableError(
        {
          title: "Caution!",
          message:
            "This application is still in development past the release of 5.0.6. It was hidden to prevent you from seeing this half finished help center. Do not take the content or UI serious.",
          buttons: [{ caption: "OK", action() {} }],
        },
        getPID("HelpCenter")
      );
    },
  },
};
