import { createDirectory } from "../../api/fs/directory";
import type { Command } from "../interface";

export const Mkdir: Command = {
  keyword: "mkdir",
  async exec(cmd, argv, term) {
    const p = term.path;
    const dir = argv.join(" ");
    const name = (p != "./" ? `${p}/${dir}` : dir).replaceAll("//", "/");

    const v = await createDirectory(name);

    term.std.writeLine(`Directory '${dir}' created.`);
  },
  description: "Create a directory",
  syntax: `"<[name]>"`,
};
