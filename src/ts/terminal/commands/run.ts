import { get } from "svelte/store";
import { getDirectory } from "../../api/fs/directory";
import { openUserFile, openWithDialog } from "../../api/fs/open";
import type { UserDirectory, PartialArcFile } from "../../api/interface";
import { AppStore } from "../../applogic/store";
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
  description: "Run a file from your ArcFS account.",
  syntax: `"<[filename]>"`,
};

async function o(f: PartialArcFile) {
  const scope = f.scopedPath;

  if (scope.startsWith("./")) f.scopedPath = scope.replace("./", "");

  const file = await openUserFile(f);

  AppStore.set(get(AppStore));

  if (file == true) return;

  openWithDialog({ ...file, anymime: true });
}
