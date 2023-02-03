import { writable } from "svelte/store";
import logo from "../../../assets/apps/settings/apps.svg";
import OpenWith from "../../../lib/Apps/OpenWith.svelte";
import type { App, ArcFile } from "../interface";

export const OpenWithApp: App = {
  info: {
    name: "Open With",
    description: "Open a file with an app",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    hidden: true,
    icon: logo,
    onlineOnly: true,
  },
  size: { w: 450, h: 550 },
  pos: { x: 30, y: 40 },
  minSize: { w: 450, h: 550 },
  maxSize: { w: 450, h: 550 },
  controls: { min: false, max: false, cls: false },
  state: {
    headless: true,
    resizable: false,
    windowState: { min: false, max: false, fll: true },
  },
  content: OpenWith,
  glass: true,
  events: {
    close() {
      OpenWithFile.set(null);
    },
  },
};

export const OpenWithFile = writable<ArcFile>(null);
