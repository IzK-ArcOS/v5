import { getDirectory } from "../../api/fs/directory";
import { formatBytes } from "../../api/fs/sizes";
import type { UserDirectory } from "../../api/interface";
import type { Command } from "../interface";

export const Dir: Command = {
  keyword: "dir",
  async exec(cmd, argv, term) {
    const path = term.path as string;
    const contents = (await getDirectory(path)) as UserDirectory;
    const dirs = contents.directories;
    const files = contents.files;

    let totalSize = 0;

    term.std.writeColor(`\nDirectory contents of [${path}]\n`, "blue");

    for (let i = 0; i < dirs.length; i++) {
      const name = dirs[i].name;
      const size = `     <DIR>`;

      term.std.writeColor(`[${size}] ${name}`, "gray", "white");
    }

    for (let i = 0; i < files.length; i++) {
      const name = files[i].filename;
      const size = `${files[i].size}`.padStart(10, " ");

      totalSize += files[i].size;

      term.std.writeColor(`[${size}] ${name}`, "gray", "white");
    }

    term.std.writeLine("");

    const totalf = formatBytes(totalSize).padStart(10, " ");
    const bytes = `(${totalSize} bytes)`;

    term.std.writeLine(`${totalf} ${bytes}`);
  },
  description: "List the contents of the current directory",
  syntax: `<[path]>`,
};
