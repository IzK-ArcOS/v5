import dayjs from "dayjs";
import { getDirectory, sortDirectories } from "../../api/fs/directory";
import { sortFiles } from "../../api/fs/file";
import { formatBytes } from "../../api/fs/sizes";
import type { UserDirectory } from "../../api/interface";
import type { Command } from "../interface";

export const Dir: Command = {
  keyword: "dir",
  async exec(cmd, argv, term) {
    const path = term.path as string;
    const dir = (await getDirectory(path)) as UserDirectory;
    const subdirs = sortDirectories(dir.directories);
    const files = sortFiles(dir.files);

    for (let i = 0; i < subdirs.length; i++) {
      const subdir = subdirs[i];

      term.std.writeColor(
        `-- --- ----, --:-- <directory> [${subdir.name}]/`,
        "blue"
      );
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const date = dayjs(file.dateModified || 0)
        .format("DD MMM YYYY, HH:mm")
        .padEnd(19, " ");
      const size = formatBytes(file.size || 0).padEnd(12, " ");

      term.std.writeColor(`${date}${size}[${file.filename}]`, "blue");
    }
  },
  description: "List the contents of the current directory",
  syntax: `<[path]>`,
};
