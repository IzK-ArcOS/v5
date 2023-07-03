import logo from "../../../assets/apps/apppoker.svg";
import TextView from "../../../lib/Apps/TextView.svelte";
import SaveNewFile from "../../../lib/Apps/TextView/overlays/SaveNewFile.svelte";
import type { App } from "../interface";

export const TextEditor: App = {
  info: {
    name: "Text Editor",
    description: "Edit plain text files",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    hidden: false,
    icon: logo,
  },
  initialSize: { w: 700, h: 550 },
  minSize: { w: 400, h: 300 },
  maxSize: { w: 1000, h: 800 },
  controls: { minimized: true, maximized: true, close: true },
  windowProperties: {
    headless: false,
    resizable: true,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
  content: TextView,
  glass: true,
  fileMimes: ["text/plain; charset=utf-8"],
  overlayApps: {
    saveNewFile: {
      info: {
        name: "Save file",
        author: "Izaak Kuipers",
        version: "1.0.1",
      },
      size: { w: NaN, h: NaN },
      content: SaveNewFile,
    },
  },
};
