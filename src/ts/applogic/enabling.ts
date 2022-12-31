import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import { errorMessage } from "../errorlogic/main";
import { UserData } from "../userlogic/interfaces";
import { closeWindow } from "./events";
import { SystemApps } from "./imports";
import { updateStores, WindowStore } from "./store";

export function disableApp(id: string) {
  Log({
    msg: `Disabling app ${id}`,
    source: "enabling.ts: disableApp",
    level: LogLevel.info,
  });

  if (SystemApps.includes(id)) {
    return errorMessage(
      "Can't disable application",
      `App "${id}" is a system application. System applications are core to ArcOS and cannot be disabled without breaking certain functionality.`,
      null,
      { caption: "OK", action: () => {} }
    );
  }

  const udata = get(UserData);

  closeWindow(id);

  if (!udata.disabledApps.includes(id)) udata.disabledApps.push(id);

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == id) ws[i].disabled = true;
  }

  UserData.set(udata);
  WindowStore.set(ws);

  updateStores();
}

export function enableApp(id: string) {
  Log({
    msg: `Enabling app ${id}`,
    source: "enabling.ts: enableApp",
    level: LogLevel.info,
  });

  const udata = get(UserData);

  for (let i = 0; i < udata.disabledApps.length; i++) {
    if (udata.disabledApps[i] == id) udata.disabledApps.splice(i, 1);
  }

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == id) ws[i].disabled = false;
  }

  WindowStore.set(ws);
  UserData.set(udata);

  updateStores();
}
