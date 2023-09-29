import { Log } from "../console";
import { errorMessage } from "../errorlogic/main";
import { UserData } from "../userlogic/interfaces";
import { SystemApps } from "./imports/store";
import { updateStores, WindowStore } from "./store";

export function disableApp(id: string) {
  Log("enabling.ts: disableApp", `Disabling app ${id}`);

  if (SystemApps.includes(id)) {
    return errorMessage(
      "Can't disable application",
      `App "${id}" is a system application. System applications are core to ArcOS and cannot be disabled without breaking certain functionality.`,
      null,
      "AppLogic",
      { caption: "OK", action: () => {} }
    );
  }

  UserData.update((udata) => {
    if (!udata.disabledApps.includes(id)) udata.disabledApps.push(id);

    return udata;
  });

  WindowStore.update((ws) => {
    for (let i = 0; i < ws.length; i++) {
      if (ws[i].id == id) ws[i].disabled = true;
    }

    return ws;
  });

  updateStores();
}

export function enableApp(id: string) {
  Log("enabling.ts: enableApp", `Enabling app ${id}`);

  UserData.update((udata) => {
    for (let i = 0; i < udata.disabledApps.length; i++) {
      if (udata.disabledApps[i] == id) udata.disabledApps.splice(i, 1);
    }

    return udata;
  });

  WindowStore.update((ws) => {
    for (let i = 0; i < ws.length; i++) {
      if (ws[i].id == id) ws[i].disabled = false;
    }

    return ws;
  });

  updateStores();
}
