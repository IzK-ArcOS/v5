import logo from "../../../assets/apps/settings.svg";
import ProfilePicture from "../../../lib/Apps/Settings/Pages/Account/ProfilePictureOverlay.svelte";
import SettingsAppSvelte from "../../../lib/Apps/SettingsApp.svelte";
import type { App } from "../interface";
import { currentSettingsPage } from "./SettingsApp/main";
import { SettingsPages } from "./SettingsApp/store";

export const SettingsApp: App = {
  info: {
    name: "System Settings",
    description: "Change the way ArcOS works",
    builtin: true,
    version: "1.0.0",
    author: "ArcOS Team",
    icon: logo,
  },
  size: { w: 700, h: 500 },
  pos: { x: 30, y: 40 },
  minSize: { w: 700, h: 500 },
  maxSize: { w: 900, h: 600 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: true,
    windowState: { min: false, max: false, fll: false },
  },
  content: SettingsAppSvelte,
  glass: true,
  overlays: {
    pfpSel: {
      info: {
        name: "Profile Picture Selector",
        version: "1.0.0",
        author: "ArcOS Team",
      },
      content: ProfilePicture,
      size: { w: 382, h: 410 },
      show: false,
    },
  },
  events: {
    close() {
      currentSettingsPage.set(null);
    },
    open() {
      currentSettingsPage.set(SettingsPages[0]);
    },
  },
};
