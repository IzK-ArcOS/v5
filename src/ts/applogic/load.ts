import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import { UserData } from "../userlogic/interfaces";
import { isLoaded } from "./checks";
import { SystemApps } from "./imports";
import type { App } from "./interface";
import { registerAppShortcuts } from "./keyboard/main";
import { updateStores, WindowStore } from "./store";

export function loadWindow(id: string, app: App) {
  if (!isLoaded(id)) {
    const ws = get(WindowStore);

    const data = { ...app, id };

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

    WindowStore.set(ws);

    registerAppShortcuts(id, app);

    Log({
      level: LogLevel.info,
      msg: `Loaded ${id} into WindowStore.`,
      source: "AppLogic: loadWindow",
    });

    return;
  }

  Log({
    level: LogLevel.error,
    msg: `Window ${id} already exists in WindowStore.`,
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
