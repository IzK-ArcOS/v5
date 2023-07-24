import { getDirectory } from "../../api/fs/directory";
import type { UserDirectory } from "../../api/interface";
import type { Command } from "../interface";
import type { ArcTerm } from "../main";

export const Cd: Command = {
  keyword: "cd",
  async exec(cmd, argv, term) {
    const path = `${term.path}/${argv.join(" ")}`;

    const req = await getDirectory(path);

    if (req == false) {
      return err(term, path);
    }

    const dir = req as UserDirectory;

    if (dir.scopedPath.includes("..")) return err(term, path);

    term.path = dir.scopedPath;
  },
  description: "Change directory",
  syntax: "[<path>]",
};

function err(t: ArcTerm, p: string) {
  return t.std.Error(`Can't change to "${p}": Path not found`);
}
