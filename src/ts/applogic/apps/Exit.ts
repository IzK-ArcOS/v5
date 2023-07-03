import { writable } from "svelte/store";
import logo from "../../../assets/apps/exit.svg";
import ExitSvelte from "../../../lib/Apps/Exit.svelte";
import type { App } from "../interface";

export const Exit: App = {
  info: {
    name: "Exit",
    description: "ArcOS Exit Menu",
    builtin: true,
    version: "2.0.0",
    author: "Izaak Kuipers",
    icon: logo,
    hidden: true,
  },
  initialSize: { w: 280, h: 50 },
  minSize: { w: 280, h: 50 },
  maxSize: { w: 280, h: 50 },
  controls: { minimized: false, maximized: false, close: true },
  windowProperties: {
    headless: true,
    resizable: false,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: true },  
  content: ExitSvelte,
  glass: true,

  events: {
    keyboardShortcuts: [
      {
        shift: true,
        key: "",
        action() {
          ExitShowAT.set(true);
        },
      },
    ],
    close(app) {
      ExitShowAT.set(false);
    },
  },
};

export const ExitShowAT = writable<boolean>(false);
