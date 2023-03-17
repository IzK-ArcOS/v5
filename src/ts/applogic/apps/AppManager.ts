import logo from "../../../assets/apps/appmanager.svg";
import AppManagerSvelte from "../../../lib/Apps/AppManager.svelte";
import RunDialog from "../../../lib/Apps/AppManager/overlays/RunDialog.svelte";
import { createTrayIcon, disposeTrayIcon } from "../../desktop/tray/main";
import type { App } from "../interface";

export const AppManager: App = {
  info: {
    name: "Application Manager",
    description: "Manage Open Apps",
    builtin: true,
    version: "1.5.0",
    author: "Izaak Kuipers",
    icon: logo,
  },
  size: { w: 600, h: 500 },
  pos: { x: 30, y: 40 },
  minSize: { w: 600, h: 500 },
  maxSize: { w: 600, h: 500 },
  controls: { min: false, max: true, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: AppManagerSvelte,
  glass: true,
  events: {
    open() {
      createTrayIcon({
        image: AppManager.info.icon,
        identifier: "Application Manager",
        onOpen() {},
      });
    },
    close() {
      disposeTrayIcon("Application Manager");
    },
  },
  overlays: {
    run: {
      info: {
        name: "Run",
        author: "ArcOS Team",
        version: "1.0.0",
      },
      size: { w: NaN, h: NaN },
      show: false,
      content: RunDialog,
    },
  },
};
