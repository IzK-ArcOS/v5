import SettingsAppSvelte from "../../../lib/Apps/SettingsApp.svelte";
import { SettingsIcon } from "../../icon/apps";
import type { App } from "../interface";
import { currentSettingsPage } from "./SettingsApp/main";
import { SettingsPages } from "./SettingsApp/store";
import { SettingsAppContext } from "./settings/context";
import AccountPageOverlays from "./settings/overlays/account";
import DesktopOverlays from "./settings/overlays/desktop";
import LockScreenOverlays from "./settings/overlays/lockScreen";
import ProfilePictureOverlays from "./settings/overlays/pfp";
import { ThemeOverlays } from "./settings/overlays/theme";
import VisualsOverlays from "./settings/overlays/visuals";

export const SettingsApp: App = {
  info: {
    name: "System Settings",
    description: "Change the way ArcOS works",
    builtin: true,
    version: "4.0.0",
    author: "ArcOS Team",
    icon: SettingsIcon,
    appGroup: "systemTools",
  },
  size: { w: 730, h: 500 },
  pos: { x: 30, y: 40 },
  minSize: { w: 730, h: 500 },
  maxSize: { w: 1100, h: 600 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
  content: SettingsAppSvelte,
  glass: true,
  overlays: {
    ...AccountPageOverlays,
    ...VisualsOverlays,
    ...DesktopOverlays,
    ...LockScreenOverlays,
    ...ProfilePictureOverlays,
    ...ThemeOverlays,
  },
  events: {
    close() {
      currentSettingsPage.set(SettingsPages[0]);
    },
    open() {
      currentSettingsPage.set(SettingsPages[0]);
    },
  },
  contextMenu: SettingsAppContext,
};
