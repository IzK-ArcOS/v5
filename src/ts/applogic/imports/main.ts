import { Log, LogLevel } from "../../console";
import { openWindow } from "../events";
import type { App } from "../interface";
import { loadWindow } from "../load";
import { updateStores } from "../store";
import { DefaultApps } from "./store";

export async function importDefault(open = false) {
  Log({
    msg: `Importing default applications`,
    source: "imports.ts: importDefault",
    level: LogLevel.info,
  });

  const entries = Object.entries(DefaultApps);

  for (let i = 0; i < entries.length; i++) {
    Log({
      msg: `Importing default application "${entries[i][0]}"...`,
      source: `imports.ts: importDefault`,
      level: LogLevel.info,
    });

    await loadWindow(entries[i][0], entries[i][1]);

    if (open) openWindow(entries[i][0]);
  }

  updateStores();
}
