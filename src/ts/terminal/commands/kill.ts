import { closeWindow } from "../../applogic/events";
import { getWindow } from "../../applogic/store";
import type { Command } from "../interface";

export const Kill: Command = {
  keyword: "kill",
  exec(cmd, argv, term) {
    const appId = argv[0];

    if (!appId) return term.util.Error("Missing application ID.");

    const window = getWindow(appId);

    if (!window) return term.util.Error(`${appId}: app not found.`);

    closeWindow(appId);

    term.util.writeLine(`Closed ${window.info.name}`);
  },
  description: "Terminate a program",
  syntax: `"<[appId]>"`,
};
