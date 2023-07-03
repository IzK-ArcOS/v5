import { writable } from "svelte/store";
import logo from "../../../assets/apps/testapp.svg";
import AppInfoSvelte from "../../../lib/Apps/AppInfo.svelte";
import type { App } from "../interface";

export const AppInfo: App = {
  info: {
    name: "Application Info",
    description: "View information about an application",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    hidden: true,
    icon: logo,
  },
  initialSize: { w: 500, h: 450 },
  minSize: { w: 500, h: 450 },
  maxSize: { w: 500, h: 450 },
  controls: { minimized: true, maximized: false, close: true },
  windowProperties: {
    headless: false,
    resizable: false,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
  content: AppInfoSvelte,
  glass: false,
  events: {
    close() {
      AppInfoId.set(null);
    },
  },
};

export const AppInfoId = writable<string>(null);
