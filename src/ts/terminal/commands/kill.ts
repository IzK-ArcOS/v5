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

    term.std.writeLine(`Closed ${window.info.name}`);
  },
  description: "Terminate a program",
  syntax: `"<[appId]>"`,
};
