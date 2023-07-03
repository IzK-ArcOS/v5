import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import { errorMessage } from "../errorlogic/main";
import { UserData } from "../userlogic/interfaces";
import { closeProcess } from "./events";
import { AppStore } from "./store";
import { SystemApps } from "./imports/store";

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
      "AppLogic",
      { caption: "OK", action: () => {} }
    );
  }

  const udata = get(UserData);

  // TODO close all processes running this app
  // closeProcess(id);

  if (!udata.disabledApps.includes(id)) udata.disabledApps.push(id);

  const appStore = get(AppStore);

  appStore[id].disabled = true;

  UserData.set(udata);
  AppStore.set(appStore);
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

  const appStore = get(AppStore);

  appStore[id].disabled = false;

  AppStore.set(appStore);
  UserData.set(udata);

   
}
