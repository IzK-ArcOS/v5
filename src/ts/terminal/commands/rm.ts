import { deleteItem } from "../../api/fs/file";
import type { Command } from "../interface";

export const Rm: Command = {
  keyword: "rm",
  async exec(cmd, argv, term) {
    const p = term.path;
    const dir = argv.join(" ");
    const name = (p != "./" ? `${p}/${dir}` : dir).replaceAll("//", "/");

    await deleteItem(name);
  },
  description: "Delete a file or folder",
};
