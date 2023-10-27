import { getDirectory } from "../../api/fs/directory";
import { readFile } from "../../api/fs/file";
import { arrayToText } from "../../api/fs/file/conversion";
import type { UserDirectory } from "../../api/interface";
import type { Command } from "../interface";

export const Rf: Command = {
  keyword: "rf",
  async exec(cmd, argv, term) {
    const path = term.path as string;
    const fn = argv.join(" ").trim();
    const dir = (await getDirectory(path)) as UserDirectory;

    if (!dir) return term.std.Error("Could not read the current directory!");

    for (let i = 0; i < dir.files.length; i++) {
      const file = dir.files[i];

      if (file.filename == fn) {
        const contents = await readFile(file.scopedPath);

        if (!contents) return term.std.Error("Could not read the file.");

        if (!file.mime.includes("text/"))
          return term.std.Error("Not attempting to read non-text file.");

        const d = arrayToText(contents);

        term.std.writeLine(d);

        return;
      }
    }

    term.std.Error(`The file doesn't exist on ArcFS.`);
  },
  help(term) {
    term.std.writeColor("Example: [rf] mwomp.txt", "blue");
  },
  description: "Read a file from ArcFS",
  syntax: "<[filename]>",
};
