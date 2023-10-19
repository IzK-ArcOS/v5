import { get } from "svelte/store";
import { writeFile } from "../../api/fs/file";
import { LogStore } from "../../console";
import { createReport } from "../../reporting/main";
import { switchExists } from "../argv";
import type { Command } from "../interface";

export const RepInfo: Command = {
  keyword: "repinfo",
  async exec(cmd, argv, term) {
    const data = {
      ...createReport({
        body: "This is what a report sent to the Reports server may look like",
        title: "Example report",
        includeApi: true,
        includeUserData: true,
      }),
    } as any;

    if (switchExists(argv, "json")) {
      const json = JSON.stringify(data, null, 2);
      term.std.writeLine(json);

      if (switchExists(argv, "file")) {
        const filename = `${term.path}/repinfo_${new Date().getTime()}.json`;
        const blob = new Blob([json], { type: "application/json" });
        await writeFile(filename, blob);
        term.std.Info(`Written RepInfo to [${filename}]`);
      }

      return;
    }

    data.userdata = "UserData {...}";
    data.log = `LogStore {${get(LogStore).length}}`;

    const entries = Object.entries(data);

    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const key = entry[0].padEnd(23, " ");
      const value = entry[1];

      if (value && typeof value === "object") {
        term.std.writeColor(`[${key}]:`, "yellow");

        const subEntries = Object.entries(JSON.parse(JSON.stringify(value)));

        for (let j = 0; j < subEntries.length; j++) {
          const key = subEntries[j][0].padEnd(18, " ");
          const value = subEntries[j][1];

          term.std.writeColor(` --> [${key}]: ${value}`, "yellow");
        }

        continue;
      }

      term.std.writeColor(`[${key}]: ${value}`, "yellow");
    }
  },
  description: "Display information in a bug report",
  hidden: true,
};
