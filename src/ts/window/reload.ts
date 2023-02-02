import { get } from "svelte/store";
import { setSettingsPage } from "../applogic/apps/SettingsApp/main";
import { SettingsPages } from "../applogic/apps/SettingsApp/store";
import { openWindow } from "../applogic/events";
import { importDefault } from "../applogic/imports";
import { WindowStore } from "../applogic/store";
import { makeNotification } from "../notiflogic/main";
import { UserData } from "../userlogic/interfaces";

export function reloadApps() {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (!ws[i].info.builtin) continue;

    ws.splice(i, 1);
  }

  WindowStore.set(ws);

  setTimeout(() => {
    importDefault();

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
