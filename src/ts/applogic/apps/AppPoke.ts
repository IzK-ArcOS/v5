import AppManagerSvelte from "../../../lib/Apps/AppManager.svelte";
import AppPokerSvelte from "../../../lib/Apps/AppPoker.svelte";
import type { App } from "../interface";
import { AppManagerAppData } from "./AppManager/Manager";
import logo from "../../../assets/apps/AppPoker.svg";

export const AppPoker: App = {
  info: {
    name: "App Poker",
    description: "Poke properties of applications",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    hidden: true,
    icon: logo,
  },
  size: { w: 500, h: 300 },
  pos: { x: 30, y: 40 },
  minSize: { w: 500, h: 300 },
  maxSize: { w: 500, h: 300 },
  controls: { min: false, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: AppPokerSvelte,
  glass: false,
  events: {
    close() {
      AppManagerAppData.set(null);
    },
  },
};
