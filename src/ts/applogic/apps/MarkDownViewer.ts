import type { App } from "../interface";
import icon from "../../../assets/apps/markdownviewer.svg";
import MarkDownViewerSvelte from "../../../lib/Apps/MarkDownViewer.svelte";
import { resetTitleSuffix, setTitleSuffix } from "../title";
import { get } from "svelte/store";
import { AppStore, ProcessStore } from "../store";
import { closeFile } from "../../api/fs/main";

export const MarkDownViewer: App = {
  info: {
    name: "Markdown Viewer",
    description: "View .MD files",
    author: "ArcOS Team",
    version: "1.0.0",
    icon,
    builtin: true,
    hidden: true,
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
  content: MarkDownViewerSvelte,
  glass: false,
  fileMimes: ["text/plain; charset=utf-8", "text/markdown; charset=utf-8"],
  events: {
    openFile(pid: number) {
      const process = get(ProcessStore)[pid];

      if (!process.openedFile) return;

      setTitleSuffix(` - ${process.openedFile.path}`, pid);
    },
  },
};
