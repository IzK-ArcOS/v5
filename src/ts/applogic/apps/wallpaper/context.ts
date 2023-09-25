import { get } from "svelte/store";
import { SEP_ITEM } from "../../../contextmenu/main";
import { alignDesktopIcons } from "../../../desktop/icons";
import { restart, shutdown } from "../../../desktop/power";
import { errorMessage } from "../../../errorlogic/main";
import {
  AppManIcon,
  ExitIcon,
  FileManagerIcon,
  TestAppIcon,
} from "../../../icon/apps";
import {
  AppsIcon,
  DesktopIcon,
  PersonalizationIcon,
  ThemesIcon,
  TrashIcon,
} from "../../../icon/main";
import { UserData } from "../../../userlogic/interfaces";
import { disableApp } from "../../enabling";
import { closeWindow, openWindow } from "../../events";
import type { AppContextMenu } from "../../interface";
import { AppInfoId } from "../AppInfo";
import { openByKey } from "../SettingsApp/store";

export const WallpaperContext: AppContextMenu = {
  "shell-wallpaper": [
    {
      caption: "Show desktop icons",
      action: () => {
        const udata = get(UserData);

        udata.sh.desktop.icons = !udata.sh.desktop.icons;

        UserData.set(udata);
      },
      icon: "apps",
      isActive: () => get(UserData).sh.desktop.icons,
    },
    {
      caption: "Align icons to grid",
      action: () => {
        const udata = get(UserData);

        udata.sh.desktop.noIconGrid = !udata.sh.desktop.noIconGrid;

        UserData.set(udata);
      },
      icon: "grid_4x4",
      isActive: () => !get(UserData).sh.desktop.noIconGrid,
    },
    {
      caption: "Reset icon alignment",
      action: () => {
        errorMessage(
          "Reset icon alignment?",
          "This will arrange the desktop icons back to their default positions. Do you want to continue?",
          DesktopIcon,
          null,
          {
            caption: "Yes",
            action() {
              alignDesktopIcons(true);
            },
          },
          { caption: "No", action() {} }
        );
      },
      icon: "undo",
    },
    SEP_ITEM,
    {
      caption: "File Manager",
      action: () => {
        openWindow("FileManager");
      },
      image: FileManagerIcon,
    },
    {
      caption: "Application Manager",
      action: () => {
        openWindow("AppMan");
      },
      image: AppManIcon,
    },
    {
      caption: "App settings",
      action: () => {
        openByKey("Apps");
      },
      image: AppsIcon,
    },
    SEP_ITEM,
    {
      caption: "Shut down",
      action: shutdown,
      icon: "power_settings_new",
    },
    {
      caption: "Restart",
      action: () => restart(false),
      icon: "refresh",
    },
    SEP_ITEM,
    {
      caption: "Themes",
      action: () => {
        openByKey("Themes");
      },
      image: ThemesIcon,
    },
    {
      caption: "Wallpaper",
      action: () => {
        openByKey("Wallpaper");
      },
      image: DesktopIcon,
    },
    {
      caption: "Visuals",
      action: () => {
        openByKey("Visuals");
      },
      image: PersonalizationIcon,
    },
  ],
  "desktopicon-app": [
    {
      caption: "Open",
      action(window, data, scope) {
        openWindow(data.id);
      },
    },
    {
      image: ExitIcon,
      caption: "Kill",
      action(window, data, scope) {
        closeWindow(data.id);
      },
    },
    SEP_ITEM,
    {
      image: TrashIcon,
      caption: "Disable",
      action(window, data, scope) {
        disableApp(data.id);
      },
    },
    SEP_ITEM,
    {
      image: TestAppIcon,
      caption: "App Info",
      action(window, data, scope) {
        AppInfoId.set(data.id);

        openWindow("AppInfo");
      },
    },
  ],
};
