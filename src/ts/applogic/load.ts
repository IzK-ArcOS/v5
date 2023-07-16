import { get } from "svelte/store";
import { Log } from "../console";
import { LogLevel } from "../console/interface";
import { makeNotification } from "../notiflogic/main";
import { UserData } from "../userlogic/interfaces";
import { centerWindow } from "./center";
import { isLoaded } from "./checks";
import type { App } from "./interface";
import { registerAppShortcuts } from "./keyboard/main";
import { WindowStore, updateStores } from "./store";
import { SystemApps } from "./imports/store";

export function loadWindow(id: string, app: App) {
  if (isLoaded(id))
    return Log(
      "AppLogic: loadWindow",
      `Window ${id} already exists in WindowStore.`,
      LogLevel.error
    );

  const ws = get(WindowStore);
  const data = { ...app, id };
  const children = getChildren(app, id);
  const userdata = get(UserData);
  const disabledList = userdata ? userdata.disabledApps : [];

  if (userdata && !userdata.disabledApps) {
    userdata.disabledApps = [];
    UserData.set(userdata);
  }

  if (disabledList.includes(id) && !SystemApps.includes(id))
    data.disabled = true;

  ws.push(data);

  for (let i = 0; i < children.length; i++) {
    ws.push(children[i]);
  }

  WindowStore.set(ws);

  registerAppShortcuts(id, app);

  if (app.disabledWarning && disabledList.includes(id)) {
    makeNotification({
      ...app.disabledWarning,
      buttons: [],
      image: app.info.icon,
      timeout: 6000,
    });
  }

  setTimeout(() => {
    if (app.pos.centered) centerWindow(id);
  }, 300);

  Log("AppLogic: loadWindow", `Loaded ${id} into WindowStore.`, LogLevel.info);
}

export function getChildren(app: App, id: string) {
  const entries = Object.entries(app.children || {});
  const children: App[] = [];

  for (let i = 0; i < entries.length; i++) {
    children.push({
      ...entries[i][1],
      id: entries[i][0],
      parentId: id,
      opened: false,
      info: { ...entries[i][1].info, hidden: true },
    });
  }

  return children;
}

export function unloadWindow(id: string) {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == id) {
      Log(
        "AppLogic: unloadWindow",
        `Unloading ${id} from WindowStore.`,
        LogLevel.info
      );
      ws.splice(i, 1);
    }
  }

  WindowStore.set(ws);
  updateStores();
}
