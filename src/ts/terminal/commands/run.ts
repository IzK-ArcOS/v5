import { get } from "svelte/store";
import { getDirectory } from "../../api/fs/directory";
import { openUserFile, openWithDialog } from "../../api/fs/open";
import type { UserDirectory, UserFile } from "../../api/interface";
import { WindowStore } from "../../applogic/store";
import type { Command } from "../interface";

export const Run: Command = {
  keyword: "run",
  async exec(cmd, argv, term) {
    const path = term.path as string;
    const fn = argv.join(" ").trim();

    term.util.writeLine(`ArcFS: getting '${path}'`);

    const dir = (await getDirectory(path)) as UserDirectory;

    term.util.writeLine(`ArcFS: Looking for '${fn}'`);

    for (let i = 0; i < dir.files.length; i++) {
      const file = dir.files[i];

      if (file.filename == fn) {
        term.util.writeLine(`Load: Opening ${fn} (${file.size} Bytes)`);

        o(file);

        return;
      }
    }

    term.util.writeLine(`ArcFS: File Not Found!`);
  },
  description: "Run a file",
};

async function o(f: UserFile) {
  const scope = f.scopedPath;

  if (scope.startsWith("./")) f.scopedPath = scope.replace("./", "");

  const file = await openUserFile(f);

  WindowStore.set(get(WindowStore));

  if (file == true) return;

  openWithDialog({ ...file, anymime: true });
}
