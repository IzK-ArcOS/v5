import { get } from "svelte/store";
import { getDirectory } from "../../api/fs/directory";
import type { UserDirectory } from "../../api/interface";
import { ConnectedServer } from "../../api/main";
import type { Command } from "../interface";

export const Dir: Command = {
  keyword: "dir",
  async exec(cmd, argv, term) {
    if (!get(ConnectedServer))
      return term.util.writeLine("This command requires an ArcAPI");

    const path = term.path as string;

    const contents = (await getDirectory(path)) as UserDirectory;

    const dirs = contents.directories;
    const files = contents.files;

    term.util.writeLine(`Directory contents of ${path}`);

    for (let i = 0; i < dirs.length; i++) {
      const name = dirs[i].name;
      const size = `     <DIR>`;

      term.util.writeLine(`${size} ${name}`);
    }

    for (let i = 0; i < files.length; i++) {
      const name = files[i].filename;
      const size = `${files[i].size}`.padStart(10, " ");

      term.util.writeLine(`${size} ${name}`);
    }
  },
  description: "List the contents of the current directory",
};
