import { get } from "svelte/store";
import type { AppContextMenu } from "../../interface";
import { UserData } from "../../../userlogic/interfaces";
import { alignDesktopIcons } from "../../../desktop/icons";
import { closeWindow, openWindow } from "../../events";
import { SEP_ITEM } from "../../../contextmenu/main";
import { openByKey } from "../SettingsApp/store";
import { restart, shutdown } from "../../../desktop/power";
import appMan from "../../../../assets/apps/appmanager.svg";
import fileManager from "../../../../assets/apps/filemanager.svg";
import appSettings from "../../../../assets/apps/settings/apps.svg";
import desktopIcon from "../../../../assets/apps/settings/desktop.svg";
import appearance from "../../../../assets/apps/settings/personalization.svg";
import themesIcon from "../../../../assets/apps/settings/themes.svg";
import appInfo from "../../../../assets/apps/testapp.svg";
import kill from "../../../../assets/apps/exit.svg";
import trash from "../../../../assets/apps/logger/clear.svg";
import { errorMessage } from "../../../errorlogic/main";
import { AppInfoId } from "../AppInfo";
import { disableApp } from "../../enabling";

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
          desktopIcon,
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
      image: fileManager,
    },
    {
      caption: "Application Manager",
      action: () => {
        openWindow("AppMan");
      },
      image: appMan,
    },
    {
      caption: "App settings",
      action: () => {
        openByKey("Apps");
      },
      image: appSettings,
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
      image: themesIcon,
    },
    {
      caption: "Wallpaper",
      action: () => {
        openByKey("Wallpaper");
      },
      image: desktopIcon,
    },
    {
      caption: "Visuals",
      action: () => {
        openByKey("Visuals");
      },
      image: appearance,
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
      image: kill,
      caption: "Kill",
      action(window, data, scope) {
        closeWindow(data.id);
      },
    },
    SEP_ITEM,
    {
      image: trash,
      caption: "Disable",
      action(window, data, scope) {
        disableApp(data.id);
      },
    },
    SEP_ITEM,
    {
      image: appInfo,
      caption: "App Info",
      action(window, data, scope) {
        AppInfoId.set(data.id);

        openWindow("AppInfo");
      },
    },
  ],
};
