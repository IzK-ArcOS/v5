import { Log, LogLevel } from "../console";
import type { App } from "./interface";
import { WindowStore } from "./store";

export function loadWindow(id: string, app: App) {
  if (!WindowStore.has(id)) {
    WindowStore.set(id, app);

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
