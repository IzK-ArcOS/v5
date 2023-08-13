import { getDirectory } from "../../api/fs/directory";
import { readFile } from "../../api/fs/file";
import { arrayToText } from "../../api/fs/file/conversion";
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

      if (file.filename == fn) {
        const contents = await readFile(file.scopedPath);

        if (!contents) return term.std.Error("Could not read the file.");

        if (!file.mime.includes("text/"))
          return term.std.Error("Not attempting to read non-text file.");

        const d = arrayToText(contents);

        const parts = d.split("\n");

        term.input.processCommands(parts, file.scopedPath);

        return;
      }
    }
  },
  help(term) {
    term.std.writeColor("[NOTE]: Capitalization matters.", "yellow");
    term.std.writeColor("Example: [exec] mwomp.txt", "blue");
  },
  description: "Execute ArcTerm commands from a file",
  syntax: "<[filename]>",
};
