import { get } from "svelte/store";
import {
  setSettingsPage,
  SettingsPages,
} from "../applogic/apps/SettingsApp/main";
import { openWindow } from "../applogic/events";
import { importDefault } from "../applogic/imports";
import { WindowStore } from "../applogic/store";
import { makeNotification } from "../notiflogic/main";
import { UserData } from "../userlogic/interfaces";

export function reloadApps() {
  WindowStore.set([]);
  importDefault();

  setTimeout(() => {
    const u = get(UserData);
    const windows = get(WindowStore);

    makeNotification({
      title: "Reloaded",
      message: `Reloaded all applications. Any unsaved changes have not been saved.<br/><br/>Apps reloaded: ${
        u.disabledApps.length
      } / ${windows.length} (${Math.floor(
        (100 / windows.length) * u.disabledApps.length
      )}%)`,
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
