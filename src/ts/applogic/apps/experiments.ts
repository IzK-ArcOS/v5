import logo from "../../../assets/update.svg";
import Experiments from "../../../lib/Apps/Experiments.svelte";
import Warning from "../../../lib/Apps/Experiments/Warning.svelte";
import { createOverlayableError } from "../../errorlogic/overlay";
import { closeWindow } from "../events";
import type { App } from "../interface";

export const ExperimentsApp: App = {
  info: {
    name: "Experiments",
    description: "Spooky scary experiments",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    icon: logo,
    hidden: true,
  },
  size: { w: 500, h: 600 },
  pos: { x: 30, y: 40 },
  minSize: { w: 500, h: 600 },
  maxSize: { w: 500, h: 600 },
  controls: { min: false, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: Experiments,
  glass: false,
  events: {
    open(app) {
      createOverlayableError(
        {
          title: "Please use this application with caution.",
          component: Warning,
          buttons: [
            { caption: "I see, I want to proceed", action() {} },
            {
              caption: "Sounds like pain, get me out",
              action() {
                closeWindow(app.id);
              },
            },
          ],
        },
        app.id
      );
    },
  },
};
