import { getDirectory } from "../../api/fs/directory";
import { readFile } from "../../api/fs/file";
import type { UserDirectory } from "../../api/interface";
import { getSwitches } from "../argv";
import type { Command } from "../interface";
import type { ArcTerm } from "../main";

const DEFSIZE = 20;

export const Ri: Command = {
  keyword: "ri",
  async exec(cmd, argv, term) {
    const args = getSwitches(argv);

    const file = args["file"];
    const url = args["url"];
    let size: number;

    try {
      size = parseInt(args["height"]);
    } catch {
      size = DEFSIZE;
    }

    term.std.writeLine("\n");

    if (file) return await displayFile(term, file, size || DEFSIZE);

    if (url) return displayUrl(term, url, size || DEFSIZE);

    term.std.Error("Missing parameters.");
  },
  description: "Display image from ArcFS or URL",
};

async function displayFile(term: ArcTerm, fn: string, height: number) {
  const path = term.path as string;

  const dir = (await getDirectory(path)) as UserDirectory;

  for (let i = 0; i < dir.files.length; i++) {
    const file = dir.files[i];

    if (file.filename == fn) {
      const contents = await readFile(file.scopedPath);

      if (!contents) return term.std.Error("Could not read the file.");

      const blob = new Blob([new Uint8Array(contents)], { type: file.mime });

      const url = URL.createObjectURL(blob);

      term.std.writeImage(url, height);

      return;
    }
  }
}

export function displayUrl(term: ArcTerm, url: string, height: number) {
  term.std.writeImage(url, height || DEFSIZE);
}
