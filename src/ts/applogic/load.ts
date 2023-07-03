import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import { makeNotification } from "../notiflogic/main";
import { UserData } from "../userlogic/interfaces";
import { centerWindow } from "./center";
import { isLoaded } from "./checks";
import type { App } from "./interface";
import { registerProcessShortcuts } from "./keyboard/main";
import { AppStore } from "./store";
import { SystemApps } from "./imports/store";

export function loadApp(id: string, app: App) {
  if (isLoaded(id))
    return Log({
      level: LogLevel.error,
      msg: `App ${id} already exists in AppStore.`,
      source: "AppLogic: loadApp",
    });
  const appStore = get(AppStore);
  const appData = { ...app, id };
  // const children: App[] = [];
  // const entries = Object.entries(data.children || {});

  // for (let i = 0; i < entries.length; i++) {
  //   children.push({
  //     ...entries[i][1],
  //     id: entries[i][0],
  //     parentId: id,
  //     opened: false,
  //     info: { ...entries[i][1].info, hidden: true },
  //   });
  // }

  const userdata = get(UserData);

  if (!userdata.disabledApps) {
    userdata.disabledApps = [];
    UserData.set(userdata);
  }

  if (
    userdata &&
    userdata.disabledApps.includes(id) &&
    !SystemApps.includes(id)
  )
    appData.disabled = true;

  appStore[id] = appData;

  // for (let i = 0; i < children.length; i++) {
  //   appStore.push(children[i]);
  // }

  AppStore.set(appStore);

  const disabledList = get(UserData).disabledApps;

  if (app.disabledWarning && disabledList.includes(id)) {
    makeNotification({
      ...app.disabledWarning,
      buttons: [],
      image: app.info.icon,
      timeout: 6000,
    });
  }

  Log({
    level: LogLevel.info,
    msg: `Loaded ${id} into AppStore.`,
    source: "AppLogic: loadApp",
  });
}

export function unloadWindow(id: string) {
  const appStore = get(AppStore);

  Log({
    level: LogLevel.info,
    msg: `Unloading ${id} from WindowStore.`,
    source: "AppLogic: unloadWindow",
  });
  delete appStore[id];

  AppStore.set(appStore);
   
}
