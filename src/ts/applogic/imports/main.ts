import { Log } from "../../console";
import { LogLevel } from "../../console/interface";
import { openWindow } from "../events";
import { loadWindow } from "../load";
import { updateStores } from "../store";
import { DefaultApps } from "./store";

export async function importDefault(open = false) {
  Log(
    "imports.ts: importDefault",
    `Importing default applications`,
    LogLevel.info
  );

  const entries = Object.entries(DefaultApps);

  for (let i = 0; i < entries.length; i++) {
    Log(
      `imports.ts: importDefault`,
      `Importing default application "${entries[i][0]}"...`,
      LogLevel.info
    );

    await loadWindow(entries[i][0], entries[i][1]);

    if (open) openWindow(entries[i][0]);
  }

  updateStores();
}
