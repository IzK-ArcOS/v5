import { get } from "svelte/store";
import { getOpenedStore, WindowStore } from "../../applogic/store";
import type { Command } from "../interface";

export const AppList: Command = {
  keyword: "applist",
  exec(cmd, argv, term) {
    const ws = argv[0] == "opened" ? getOpenedStore() : get(WindowStore);

    const hName = `Name`.padEnd(30, " ");
    const hId = `ID`.padEnd(30, " ");
    const hVer = `Version`;
    const header = `${hName}${hId}${hVer}`;

    term.util.writeColor(`[${header}]`, "yellow");
    term.util.writeSeperator(header.length);

    for (let i = 0; i < ws.length; i++) {
      const id = ws[i].id.padEnd(30, " ");
      const name = ws[i].info.name.padEnd(30, " ");
      const version = ws[i].info.version;

      term.util.writeLine(`${name}${id}${version}`);
    }
  },
  description: "List all- or opened ArcOS apps.",
};
