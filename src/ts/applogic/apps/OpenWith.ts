import { writable } from "svelte/store";
import logo from "../../../assets/apps/settings/apps.svg";
import OpenWith from "../../../lib/Apps/OpenWith.svelte";
import type { App } from "../interface";
import type { ArcFile } from "../../api/interface";

export const OpenWithApp: App = {
  info: {
    name: "Open With",
    description: "Open a file with an app",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    hidden: true,
    icon: logo,
  },
  initialSize: { w: 450, h: 550 },
  minSize: { w: 450, h: 550 },
  maxSize: { w: 450, h: 550 },
  controls: { minimized: false, maximized: false, close: false },
  windowProperties: {
    headless: true,
    resizable: false,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: true },
  content: OpenWith,
  glass: true,
  events: {
    close() {
      OpenWithFile.set(null);
    },
  },
};

export const OpenWithFile = writable<ArcFile>(null);
