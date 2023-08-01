import { get } from "svelte/store";
import { writeFile } from "../../api/fs/file";
import { fbClass } from "../../applogic/apps/FileBrowser/main";
import { LogStore } from "../../console";
//import sleep from "../../sleep"; // Unused import
import type { Command } from "../interface";
import { compileStringLog } from "../../console/collector";

export const LogDump: Command = {
  keyword: "logdump",
  async exec(cmd, argv, term) {
    const filename = `LogDump-${Math.floor(Math.random() * 1e9)}.txt`;

    term.std.writeColor(`Writing log to [${filename}]...\n`, "purple");

    const log = get(LogStore);

    let str = "-- [START OF LOG] --\n";

    str += compileStringLog().join("\n");

    const b = new Blob([str], { type: "text/plain" });

    await writeFile(`${term.path}/${filename}`, b);

    term.vars.set("ldout", filename);

    term.std.writeColor(`\nWrote [${str.length}] bytes.`, "purple");
    fbClass.refresh();
  },
  description: "Dump the log to a file",
  hidden: true,
};
