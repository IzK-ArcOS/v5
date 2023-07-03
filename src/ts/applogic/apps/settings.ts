import logo from "../../../assets/apps/settings.svg";
import SettingsAppSvelte from "../../../lib/Apps/SettingsApp.svelte";
import type { App } from "../interface";
import { currentSettingsPage } from "./SettingsApp/main";
import { SettingsPages } from "./SettingsApp/store";
import ProfilePicture from "../../../lib/Apps/Settings/Pages/Account/Overlays/ProfilePicture.svelte";
import CustomProfilePicture from "../../../lib/Apps/Settings/Pages/Account/Overlays/CustomProfilePicture.svelte";
import ProfilePictureView from "../../../lib/Apps/Settings/Pages/Account/Overlays/ProfilePictureView.svelte";
import UserDataExplorer from "../../../lib/Apps/Settings/Pages/Account/Overlays/UserDataExplorer.svelte";
import ChangePassword from "../../../lib/Apps/Settings/Pages/Account/Overlays/ChangePassword.svelte";
import ChangeUsername from "../../../lib/Apps/Settings/Pages/Account/Overlays/ChangeUsername.svelte";
import ChangeTitleButtons from "../../../lib/Apps/Settings/Pages/Account/Overlays/ChangeTitleButtons.svelte";
import CustomWallpaper from "../../../lib/Apps/Settings/Pages/Account/Overlays/CustomWallpaper.svelte";
import SaveTheme from "../../../lib/Apps/Settings/Pages/Account/Overlays/SaveTheme.svelte";
import { SettingsAppContext } from "./settings/context";

const ProfilePictureOverlays = {
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
  customPfp: {
    info: {
      name: "Custom Profile Picture",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: CustomProfilePicture,
    size: { w: 350, h: 125 },
    show: false,
  },
  largePfp: {
    info: {
      name: "View Profile Picture",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: ProfilePictureView,
    size: { w: 320, h: 360 },
    show: false,
  },
  changeTitleButtons: {
    info: {
      name: "Change Titlebar Buttons",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: ChangeTitleButtons,
    size: { w: 400, h: 300 },
    show: false,
  },
};

const AccountPageOverlays = {
  udataExplorer: {
    info: {
      name: "User Data Explorer",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: UserDataExplorer,
    size: { w: 550, h: 400 },
    show: false,
  },
  changePswd: {
    info: {
      name: "Change Password",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: ChangePassword,
    size: { w: 370, h: 195 },
    show: false,
  },
  changeUsername: {
    info: {
      name: "Change Username",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: ChangeUsername,
    size: { w: 370, h: 155 },
    show: false,
  },
};

export const DesktopOverlays = {
  customWallpaper: {
    info: {
      name: "Custom Wallpaper",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: CustomWallpaper,
    size: { w: 370, h: 118 },
    show: false,
  },
};

export const ThemeOverlays = {
  saveTheme: {
    info: {
      name: "Save Theme",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: SaveTheme,
    size: { w: 450, h: 170 },
    show: false,
  },
};

export const SettingsApp: App = {
  info: {
    name: "System Settings",
    description: "Change the way ArcOS works",
    builtin: true,
    version: "4.0.0",
    author: "ArcOS Team",
    icon: logo,
  },
  initialSize: { w: 730, h: 500 },
  minSize: { w: 730, h: 500 },
  maxSize: { w: 1100, h: 600 },
  controls: { minimized: true, maximized: true, close: true },
  windowProperties: {
    headless: false,
    resizable: true,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
  content: SettingsAppSvelte,
  glass: true,
  overlayApps: {
    ...ProfilePictureOverlays,
    ...AccountPageOverlays,
    ...DesktopOverlays,
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
