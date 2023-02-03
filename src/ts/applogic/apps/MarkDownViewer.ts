import type { App } from "../interface";
import icon from "@assets/apps/markdownviewer.svg";
import MarkDownViewerSvelte from "../../../lib/Apps/MarkDownViewer.svelte";
import { setTitleSuffix } from "../title";

export const MarkDownViewer: App = {
  info: {
    name: "Markdown Viewer",
    description: "View .MD files",
    author: "ArcOS Team",
    version: "1.0.0",
    icon,
    builtin: true,
    hidden: true,
    onlineOnly: true,
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
  content: MarkDownViewerSvelte,
  glass: false,
  fileMimes: ["text/plain; charset=utf-8", "text/markdown; charset=utf-8"],
  events: {
    openFile(app: App) {
      if (!app.openedFile) return;

      setTitleSuffix(` - ${app.openedFile.path}`, app.id);
    },
  },
};
