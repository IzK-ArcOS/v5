import { isDisabled } from "../../applogic/checks";
import { openWindow } from "../../applogic/events";
import { getWindow } from "../../applogic/store";
import type { Command } from "../interface";

export const Open: Command = {
  keyword: "open",
  exec(cmd, argv, term) {
    const appId = argv[0];

    const window = getWindow(appId);

    if (isDisabled(appId))
      return term.std.Warning(`Not opening disabled app [${appId}]`);

    if (!window) return term.std.Error(`${appId}: app not found.`);

    openWindow(appId, true);

    term.std.writeColor(`Opened [${window.info.name}]`, "purple");
  },
  help(term) {
    term.std.writeColor("[NOTE]: Capitalization matters.", "yellow");
    term.std.writeColor("Example: [open] ArcTerm", "blue");
  },
  description: "Open a window",
  syntax: `"<[appId]>"`,
};
