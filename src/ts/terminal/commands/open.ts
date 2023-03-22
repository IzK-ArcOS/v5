import { openWindow } from "../../applogic/events";
import { getWindow } from "../../applogic/store";
import type { Command } from "../interface";

export const Open: Command = {
  keyword: "open",
  exec(cmd, argv, term) {
    const appId = argv[0];

    const window = getWindow(appId);

    if (!window) return term.util.Error(`${appId}: app not found.`);

    openWindow(appId, true);

    term.util.writeLine(`Opened ${window.info.name}`);
  },
  description: "Open a window",
  syntax: `"<[appId]>"`,
};
