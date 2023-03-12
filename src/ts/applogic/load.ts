import poker from "../../assets/apps/apppoker.svg";
import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import { createTrayIcon, disposeTrayIcon } from "../desktop/tray/main";
import { errorMessage } from "../errorlogic/main";
import { UserData } from "../userlogic/interfaces";
import { isLoaded } from "./checks";
import { SystemApps } from "./imports";
import type { App } from "./interface";
import { registerAppShortcuts } from "./keyboard/main";
import { updateStores, WindowStore } from "./store";
import { makeNotification } from "../notiflogic/main";

export function loadWindow(id: string, app: App) {
  if (isLoaded(id))
    return Log({
      level: LogLevel.error,
      msg: `Window ${id} already exists in WindowStore.`,
      source: "AppLogic: loadWindow",
    });
  const ws = get(WindowStore);
  const data = { ...app, id };
  const children: App[] = [];
  const entries = Object.entries(data.children || {});

  for (let i = 0; i < entries.length; i++) {
    children.push({
      ...entries[i][1],
      id: entries[i][0],
      parentId: id,
      opened: false,
      info: { ...entries[i][1].info, hidden: true },
    });
  }

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
    data.disabled = true;

  ws.push(data);

  for (let i = 0; i < children.length; i++) {
    ws.push(children[i]);
  }

  WindowStore.set(ws);

  registerAppShortcuts(id, app);

  const disabledList = get(UserData).disabledApps;

  if (app.disabledWarning && disabledList.includes(id)) {
    console.debug("Making notif for " + app.info.name);
    makeNotification({
      ...app.disabledWarning,
      buttons: [],
      image: app.info.icon,
    });
  }

  Log({
    level: LogLevel.info,
    msg: `Loaded ${id} into WindowStore.`,
    source: "AppLogic: loadWindow",
  });
}

export function unloadWindow(id: string) {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == id) {
      Log({
        level: LogLevel.info,
        msg: `Unloading ${id} from WindowStore.`,
        source: "AppLogic: unloadWindow",
      });
      ws.splice(i, 1);
    }
  }

  WindowStore.set(ws);
  updateStores();
}
