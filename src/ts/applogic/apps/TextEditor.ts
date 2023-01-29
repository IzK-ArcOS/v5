import { writable } from "svelte/store";
import logo from "../../../assets/apps/apppoker.svg";
import AppInfoSvelte from "../../../lib/Apps/AppInfo.svelte";
import TextView from "../../../lib/Apps/TextView.svelte";
import type { App } from "../interface";
import { setTitleSuffix } from "../title";

export const TextEditor: App = {
  info: {
    name: "Editor",
    description: "Edit text files",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    hidden: true,
    icon: logo,
  },
  size: { w: 700, h: 550 },
  pos: { x: 30, y: 40 },
  minSize: { w: 400, h: 300 },
  maxSize: { w: 1000, h: 800 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
  content: TextView,
  glass: false,
  fileMimes: ["text/plain; charset=utf-8"],
  events: {
    openFile(app: App) {
      if (!app.openedFile) return;

      setTitleSuffix(` - ${app.openedFile.path}`, app.id);

      console.log(
        URL.createObjectURL(new Blob([new Uint8Array(app.openedFile.data)]))
      );
    },
  },
};

export const AppInfoId = writable<string>(null);
