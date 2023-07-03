import { get, writable } from "svelte/store";
import logo from "../../../assets/apps/imageviewer.svg";
import ImageView from "../../../lib/Apps/ImageView.svelte";
import TextView from "../../../lib/Apps/TextView.svelte";
import { UserData } from "../../userlogic/interfaces";
import type { App } from "../interface";
import { setTitleSuffix } from "../title";
import { ProcessStore } from "../store";

export const ImageViewer: App = {
  info: {
    name: "Image Viewer",
    description: "Display images from the ArcAPI",
    builtin: true,
    version: "2.0.1",
    author: "Izaak Kuipers",
    hidden: true,
    icon: logo,
  },
  initialSize: { w: 500, h: 400 },
  minSize: { w: 500, h: 400 },
  maxSize: { w: 1000, h: 700 },
  controls: { minimized: true, maximized: true, close: true },
  windowProperties: {
    headless: false,
    resizable: true,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
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
    openFile(pid: number) {
      const process = get(ProcessStore)[pid];

      if (!process.openedFile) return;

      setTitleSuffix(` - ${process.openedFile.name}`, pid);
    },
  },
  contextMenu: {
    output: [
      {
        caption: "Set as wallpaper",
        icon: "image",
        action(window, data, scope) {
          const udata = get(UserData);

          udata.sh.desktop.wallpaper = `@local:${btoa(data["path"])}`;

          UserData.set(udata);
        },
      },
    ],
  },
};
