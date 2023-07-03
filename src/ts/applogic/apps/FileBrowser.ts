import logo from "../../../assets/apps/filemanager.svg";
import FileBrowser from "../../../lib/Apps/FileBrowser.svelte";
import type { App } from "../interface";
import { FileManagerContextMenu } from "./FileBrowser/context";
import { fbOverlays } from "./FileBrowser/overlays";

export const FileBrowserApp: App = {
  info: {
    name: "File Manager",
    description: "Browse your files",
    builtin: true,
    version: "2.5.1",
    author: "ArcOS Team",
    icon: logo,
  },
  initialSize: { w: 700, h: 450 },
  minSize: { w: 700, h: 450 },
  maxSize: { w: 1000, h: 600 },
  controls: { minimized: true, maximized: true, close: true },
  windowProperties: {
    headless: false,
    resizable: true,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
  content: FileBrowser,
  glass: true,
  overlayApps: fbOverlays,
  contextMenu: FileManagerContextMenu,
};
