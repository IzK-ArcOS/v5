import { Log, LogLevel } from "../../console";
import { createProcess } from "../events";
import type { App } from "../interface";
import { loadApp } from "../load";
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

    await loadApp(entries[i][0], entries[i][1]);

    if (open) createProcess(entries[i][0]);
  }

   
}
