import { writable } from "svelte/store";
import logo from "../../../assets/apps/imageviewer.svg";
import ImageView from "../../../lib/Apps/ImageView.svelte";
import TextView from "../../../lib/Apps/TextView.svelte";
import type { App } from "../interface";
import { setTitleSuffix } from "../title";

export const ImageViewer: App = {
  info: {
    name: "Image Viewer",
    description: "Display images from the ArcAPI",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    hidden: true,
    icon: logo,
    onlineOnly: true,
  },
  size: { w: 500, h: 400 },
  pos: { x: 30, y: 40 },
  minSize: { w: 500, h: 400 },
  maxSize: { w: 1000, h: 700 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
  content: ImageView,
  glass: true,
  fileMimes: [
    "image/png",
    "image/jpeg",
    "image/svg+xml",
    "image/vnd.microsoft.icon",
    "image/bmp",
    "image/jpeg",
    "image/webp",
    "image/gif",
  ],
  events: {
    openFile(app: App) {
      if (!app.openedFile) return;

      setTitleSuffix(` - ${app.openedFile.name}`, app.id);
    },
  },
};
