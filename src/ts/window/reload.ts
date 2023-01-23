import { get } from "svelte/store";
import { setSettingsPage } from "../applogic/apps/SettingsApp/main";
import { SettingsPages } from "../applogic/apps/SettingsApp/store";
import { openWindow } from "../applogic/events";
import { importDefault } from "../applogic/imports";
import { WindowStore } from "../applogic/store";
import { makeNotification } from "../notiflogic/main";
import { UserData } from "../userlogic/interfaces";

export function reloadApps() {
  WindowStore.set([]);
  importDefault();

  setTimeout(() => {
    makeNotification({
      title: "Reloaded",
      message: `All applications have been reloaded. Any unsaved information across all apps has been lost.`,
      icon: "autorenew",
      buttons: [
        {
          capt: "Open Apps Settings",
          action: () => {
            openWindow("SettingsApp");

            setTimeout(() => {
              for (let i = 0; i < SettingsPages.length; i++) {
                if (SettingsPages[i].name == "Apps") {
                  setSettingsPage(SettingsPages[i]);
                }
              }
            }, 250);
          },
        },
      ],
    });
  }, 100);
}
