import { deleteItem } from "../../api/fs/file";
import type { Command } from "../interface";

export const Rm: Command = {
  keyword: "rm",
  async exec(cmd, argv, term) {
    const p = term.path;
    const dir = argv.join(" ");
    const name = (p != "./" ? `${p}/${dir}` : dir).replaceAll("//", "/");

    try {
      await deleteItem(name);
    } catch {
      term.std.Error(`Unable to delete "${dir}"`);
    }
  },
  description: "Delete a file or folder",
  syntax: `"<[name]>"`,
};
