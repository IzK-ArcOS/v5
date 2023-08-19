import { getDirectory } from "../../api/fs/directory";
import type { UserDirectory } from "../../api/interface";
import type { Command } from "../interface";

export const Exec: Command = {
  keyword: "exec",
  async exec(cmd, argv, term) {
    const path = term.path as string;
    const fn = argv.join(" ").trim();
    const dir = (await getDirectory(path)) as UserDirectory;

    for (let i = 0; i < dir.files.length; i++) {
      const file = dir.files[i];

      if (file.filename != fn) continue;

      await term.scripts.runScriptFile(file.scopedPath);
    }
  },
  help(term) {
    term.std.writeColor("[NOTE]: Capitalization matters.", "yellow");
    term.std.writeColor("Example: [exec] mwomp.txt", "blue");
  },
  description: "Execute ArcTerm commands from a file",
  syntax: "<[filename]>",
};
