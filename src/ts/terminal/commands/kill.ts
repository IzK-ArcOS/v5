import { closeWindow } from "../../applogic/events";
import { getWindow } from "../../applogic/store";
import type { Command } from "../interface";

export const Kill: Command = {
  keyword: "kill",
  exec(cmd, argv, term) {
    const appId = argv[0];

    if (!appId) return term.std.Error("Missing application ID.");

    const window = getWindow(appId);

    if (!window) return term.std.Error(`${appId}: app not found.`);

    closeWindow(appId);

    if (term && term.std) term.std.writeLine(`Closed ${window.info.name}`);
  },
  help(term) {
    term.std.writeColor("[NOTE]: Capitalization matters.", "yellow");
    term.std.writeColor("Example: [kill] SettingsApp", "blue");
  },
  description: "Terminate a program",
  syntax: `"<[appId]>"`,
};
