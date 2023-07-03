import { get } from "svelte/store";
import { createProcess } from "../../applogic/events";
import { AppStore } from "../../applogic/store";
import type { Command } from "../interface";

export const Open: Command = {
  keyword: "open",
  exec(cmd, argv, term) {
    const appId = argv[0];

    const app = get(AppStore)[appId];

    if (!app) return term.std.Error(`${appId}: app not found.`);

    createProcess(appId, term.process.id);

    term.std.writeLine(`Opened ${app.info.name}`);
  },
  description: "Open a window",
  syntax: `"<[appId]>"`,
};
