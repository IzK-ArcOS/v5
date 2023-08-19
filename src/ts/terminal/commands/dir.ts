import dayjs from "dayjs";
import { getDirectory, sortDirectories } from "../../api/fs/directory";
import { sortFiles } from "../../api/fs/file";
import { formatBytes } from "../../api/fs/sizes";
import type { UserDirectory } from "../../api/interface";
import type { Command } from "../interface";
import type { ArcTerm } from "../main";

export const Dir: Command = {
  keyword: "dir",
  async exec(cmd, argv, term) {
    const path = term.path as string;
    const dir = (await getDirectory(path)) as UserDirectory;

    if (argv[0]) return specific(argv[0], path, term);
    all(dir, term);
  },
  description: "List the contents of the current directory",
  syntax: `<[path]>`,
};

function all(dir: UserDirectory, term: ArcTerm) {
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

  if (subdirs.length == 0 && files.length == 0) {
    term.std.writeLine("This folder is empty.");
  }
}

async function specific(path: string, currentPath: string, term: ArcTerm) {
  if (currentPath != ".") {
    path = currentPath + "/" + path;
  }

  const dir = (await getDirectory(path)) as UserDirectory;
  const subdirs = sortDirectories(dir.directories);
  const files = sortFiles(dir.files);

  if (dir.scopedPath == undefined) {
    term.std.Error(`The directory doesn't exist in this path.`);
    return;
  }

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

  if (subdirs.length == 0 && files.length == 0) {
    term.std.writeLine("This folder is empty.");
  }
}