import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import { isLoaded } from "./checks";
import type { App } from "./interface";
import { WindowStore } from "./store";

export function loadWindow(id: string, app: App) {
  if (!isLoaded(id)) {
    const ws = get(WindowStore);

    ws[id] = { ...app, id };

    WindowStore.set(ws);

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
