import { get, writable } from "svelte/store";
import { getDirectory } from "../../../api/fs/directory";
import { defaultDirectory, UserDirectory } from "../../../api/interface";
import { Log, LogLevel } from "../../../console";

export let FileBrowserCurrentDir = writable<string>("./");
export let FileBrowserDirContents = writable<UserDirectory>(defaultDirectory);
export let FileBrowserSelectedFilename = writable<string>(null);

class FileBrowserClass {
  public async refresh() {
    Log({
      source: "FileBrowser: refresh",
      msg: "Refreshing current directory contents",
      level: LogLevel.info,
    });

    const cd = get(FileBrowserCurrentDir);

    const req = await getDirectory(cd);

    FileBrowserDirContents.set(req || { ...defaultDirectory, scopedPath: cd });
  }

  public async goToDirectory(path: string) {
    Log({
      source: "FileBrowser: goToDirectory",
      msg: `Navigating to "${path}"`,
      level: LogLevel.info,
    });

    FileBrowserCurrentDir.set(path);

    this.refresh();

    FileBrowserSelectedFilename.set(null);
  }
}

export const fbClass = new FileBrowserClass();
