import logo from "../../../assets/apps/filemanager.svg";
import FileBrowser from "../../../lib/Apps/FileBrowser.svelte";
import type { App } from "../interface";
import { fbOverlays } from "./FileBrowser/overlays";

export const FileBrowserApp: App = {
  info: {
    name: "File Manager",
    description: "Browse your files",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: logo,
    onlineOnly: true,
  },
  size: { w: 700, h: 450 },
  pos: { x: 30, y: 40 },
  minSize: { w: 700, h: 450 },
  maxSize: { w: 1000, h: 600 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
  content: FileBrowser,
  glass: true,
  overlays: fbOverlays,
};
