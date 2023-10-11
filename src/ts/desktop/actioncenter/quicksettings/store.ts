import { openWindow } from "../../../applogic/events";
import { showArcFind } from "../../../search/main";
import { UserData } from "../../../userlogic/interfaces";
import { ActionCenterOpened } from "../main";
import type { QuickSetting } from "./interface";

export const QuickSettings: QuickSetting[] = [
  {
    icon: "motion_photos_on",
    iconOff: "motion_photos_off",
    getter(udata) {
      return udata.sh.anim;
    },
    setter(udata) {
      udata.sh.anim = !udata.sh.anim;

      UserData.set(udata);

      return udata.sh.anim;
    },
    caption: "Animations",
  },
  {
    icon: "blur_on",
    iconOff: "blur_off",
    getter(udata) {
      return !udata.sh.noGlass;
    },
    setter(udata) {
      udata.sh.noGlass = !udata.sh.noGlass;

      UserData.set(udata);

      return !udata.sh.noGlass;
    },
    caption: "Transparency",
  },
  {
    icon: "call_to_action",
    iconOff: "call_to_action",
    getter(udata) {
      return udata.sh.taskbar.docked;
    },
    setter(udata) {
      udata.sh.taskbar.docked = !udata.sh.taskbar.docked;

      UserData.set(udata);

      return udata.sh.taskbar.docked;
    },
    caption: "Dock Taskbar",
  },
  {
    icon: "dark_mode",
    iconOff: "light_mode",
    getter(udata) {
      return udata.sh.desktop.theme == "dark";
    },
    setter(udata) {
      const current = udata.sh.desktop.theme;

      udata.sh.desktop.theme = current == "dark" ? "light" : "dark";

      UserData.set(udata);

      return udata.sh.desktop.theme == "dark";
    },
    caption: "Dark mode",
  },
  {
    icon: "invert_colors",
    iconOff: "invert_colors_off",
    getter(udata) {
      return udata.sh.taskbar.colored;
    },
    setter(udata) {
      udata.sh.taskbar.colored = !udata.sh.taskbar.colored;

      UserData.set(udata);

      return udata.sh.taskbar.colored;
    },
    caption: "Colored Shell",
  },
  {
    icon: "settings",
    iconOff: "settings",
    getter() {
      return false;
    },
    setter() {
      openWindow("SettingsApp");
      ActionCenterOpened.set(false);
      return false;
    },
    caption: "Settings",
  },
  {
    icon: "rocket_launch",
    iconOff: "rocket",
    getter(udata) {
      return udata.sh.taskbar.isLauncher;
    },
    setter(udata) {
      udata.sh.taskbar.isLauncher = !udata.sh.taskbar.isLauncher;

      UserData.set(udata);

      return udata.sh.taskbar.isLauncher;
    },
    caption: "Launcher",
  },
  {
    icon: "search",
    iconOff: "search",
    getter() {
      return false;
    },
    setter() {
      showArcFind.set(true);
      return false;
    },
    caption: "Search",
  },
  {
    icon: "logout",
    iconOff: "logout",
    getter() {
      return false;
    },
    setter() {
      openWindow("Exit");
      return false;
    },
    caption: "Exit",
  },
];
