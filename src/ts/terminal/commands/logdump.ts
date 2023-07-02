import { get } from "svelte/store";
import { writeFile } from "../../api/fs/file";
import { fbClass } from "../../applogic/apps/FileBrowser/main";
import { LogStore } from "../../console";
import sleep from "../../sleep";
import type { Command } from "../interface";

export const LogDump: Command = {
  keyword: "logdump",
  async exec(cmd, argv, term) {
    const filename = `LogDump-${Math.floor(Math.random() * 1e9)}.txt`;

    term.std.writeColor(`Writing log to [./${filename}]...\n`, "purple");

    const log = get(LogStore);

    let str = "-- [START OF LOG] --\n";

    const len = log.length;

    const x = term.std.writeColor(`Item [0] of [${len}] processed.`, "blue");

    for (let i = 0; i < log.length; i++) {
      const curr = i + 1;
      const perc = Math.floor((100 / len) * (i + 1));

      term.std.updateColor(
        x,
        `Item [${curr}] of [${len}] ([${perc}%]) processed.`,
        "blue"
      );

      str += `[${log[i].timestamp} | ${log[i].source}] ${log[i].msg}\n`;

      await sleep(5);
    }

    const b = new Blob([str], { type: "text/plain" });

    await writeFile(`./${filename}`, b);

    term.vars.set("ldout", filename);

    term.std.writeColor(`\nWrote [${str.length}] bytes.`, "purple");
    fbClass.refresh();
  },
  description: "Dump the log to a file",
};
