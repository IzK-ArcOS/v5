import { get } from "svelte/store";
import { writeFile } from "../../api/fs/file";
import { UserData } from "../../userlogic/interfaces";
import type { Command } from "../interface";

export const UDD: Command = {
  keyword: "udd",
  async exec(cmd, argv, term) {
    const filename = `./UserDump-${Math.floor(Math.random() * 1e9)}.txt`;
    term.std.writeColor(`Writing log to [${filename}]...\n`, "purple");

    const b = new Blob([JSON.stringify(get(UserData), null, 2)], {
      type: "text/plain",
    });

    await writeFile(filename, b);
  },
  description: "Dump the userdata to a file",
};
