import { get } from "svelte/store";
import { getDirectory } from "../../api/fs/directory";
import { openUserFile, openWithDialog } from "../../api/fs/open/main";
import type { UserDirectory, PartialArcFile } from "../../api/interface";
import { WindowStore } from "../../applogic/store";
import type { Command } from "../interface";

export const Run: Command = {
  keyword: "run",
  async exec(cmd, argv, term) {
    const path = term.path as string;
    const fn = argv.join(" ").trim();
    const dir = (await getDirectory(path)) as UserDirectory;

    for (let i = 0; i < dir.files.length; i++) {
      const file = dir.files[i];

      if (file.filename == fn) {
        term.std.writeLine(`Opening ${fn} (${file.size} Bytes)`);

        o(file);

        return;
      }
    }

    term.std.Error(`The file doesn't exist on ArcFS.`);
  },
  help(term) {
    term.std.writeColor("[NOTE]: Capitalization matters.", "yellow");
    term.std.writeColor("Example: [run] arcterm.conf", "blue");
  },
  description: "Run a file from your ArcFS account.",
  syntax: `"<[filename]>"`,
};

async function o(f: PartialArcFile) {
  const scope = f.scopedPath;

  /* if (scope.startsWith("./")) f.scopedPath = scope.replace("./", ""); */

  const file = await openUserFile(f);

  WindowStore.set(get(WindowStore));

  if (file == true) return;

  openWithDialog({ ...file, anymime: true });
}
