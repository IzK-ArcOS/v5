import { get } from "svelte/store";
import { WindowStore } from "../../applogic/store";
import type { Command } from "../interface";

export const AppList: Command = {
  keyword: "applist",
  exec(cmd, argv, term) {
    const ws = get(WindowStore);

    const hName = `Name`.padEnd(20, " ");
    const hId = `ID`.padEnd(20, " ");
    const hVer = `Version`;
    const header = `${hName}${hId}${hVer}`;

    term.util.writeLine(header);
    term.util.writeLine(``.padEnd(header.length, "-"));

    for (let i = 0; i < ws.length; i++) {
      const id = ws[i].id.padEnd(20, " ");
      const name = ws[i].info.name.padEnd(20, " ");
      const version = ws[i].info.version;

      term.util.writeLine(`${name}${id}${version}`);
    }
  },
  description: "List all ArcOS apps",
};
