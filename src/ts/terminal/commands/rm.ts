import { deleteItem } from "../../api/fs/delete";
import type { Command } from "../interface";

export const Rm: Command = {
  keyword: "rm",
  async exec(cmd, argv, term) {
    const p = term.path;
    const dir = argv.join(" ");
    const name = `${p}/${dir}`.replaceAll("//", "/");

    if (!dir.trim().length) return term.std.Error("Missing filename");

    try {
      await deleteItem(name);
    } catch {
      term.std.Error(`Unable to delete "${dir}"`);
    }
  },
  help(term) {
    term.std.writeColor("[NOTE]: Capitalization matters.", "yellow");
    term.std.writeColor("Example: [soundbus] play ...", "blue");
  },
  description: "Delete a file or folder",
  syntax: `"<[name]>"`,
};
