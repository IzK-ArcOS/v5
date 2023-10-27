import MarkDownViewerSvelte from "../../../lib/Apps/MarkDownViewer.svelte";
import { MarkDownViewerIcon } from "../../icon/apps";
import type { App } from "../interface";
import { setTitleSuffix } from "../title";

export const MarkDownViewer: App = {
  info: {
    name: "Markdown Viewer",
    description: "View .MD files",
    author: "ArcOS Team",
    version: "1.0.0",
    icon: MarkDownViewerIcon,
    builtin: true,
    hidden: true,
    requiresFile: true,
    appGroup: "utilities",
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
  fileMimes: ["text/plain", "text/markdown", "text/html"],
  fileExts: [".md"],
  events: {
    openFile(app: App) {
      if (!app.openedFile) return;

      setTitleSuffix(` - ${app.openedFile.path}`, app.id);
    },
  },
};
