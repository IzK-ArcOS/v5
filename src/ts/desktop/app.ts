import { errorMessage } from "../errorlogic/main";
import { WindowSettingsIcon } from "../icon/general";
import { createTrayIcon } from "./tray/main";

export let DESKTOP_MODE: "desktop" | "browser";

export async function getDesktopMode() {
  try {
    const req = await (await fetch("./desktop")).text();

    DESKTOP_MODE = req.startsWith("desktop") ? "desktop" : "browser";
  } catch {
    DESKTOP_MODE = "browser";
  }
}

export function checkDesktopFile() {
  if (!isDesktop())
    createTrayIcon({
      title: "You're in the web version",
      image: WindowSettingsIcon,
      identifier: "webversion-notice",
      onOpen(tray) {
        errorMessage(
          "You're running ArcOS Web",
          "Thank you for using ArcOS! It is recommended you use the ArcOS Desktop app instead of the web instance for better compatibility and security. Click Download to download it.",
          tray.image,
          null,
          {
            caption: "Download",
            action() {
              window.open(
                "https://github.com/IzK-ArcOS/ArcOS-Frontend/releases",
                "_blank"
              );
            },
          },
          {
            caption: "OK",
            action() {},
          }
        );
      },
    });
}

export const isDesktop = () => DESKTOP_MODE == "desktop";
