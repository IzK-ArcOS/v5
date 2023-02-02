import { get, writable } from "svelte/store";
import folder from "../../../../assets/apps/filemanager/folder.svg";
import { getDirectory } from "../../../api/fs/directory";
import {
  defaultDirectory,
  UserDirectory,
  UserFile,
} from "../../../api/interface";
import { Log, LogLevel } from "../../../console";
import { createOverlayableError } from "../../../errorlogic/overlay";

export let FileBrowserCurrentDir = writable<string>("./");
export let FileBrowserDirContents = writable<UserDirectory>(defaultDirectory);
export let FileBrowserSelectedFilename = writable<string>(null);
export let FileBrowserOpeningFile = writable<UserFile>(null);
export let FileBrowserDeletingFilename = writable<string>(null);
export let FileBrowserUploadFilename = writable<string>(null);
export let FileBrowserOpenCancelled = writable<boolean>(false);

FileBrowserOpenCancelled.subscribe((v) => {
  if (!v) return;

  createOverlayableError(
    {
      title: "Open cancelled",
      message: "The opening procedure was cancelled by the user.",
      buttons: [{ caption: "OK", action() {} }],
      image: folder,
    },
    "FileManager"
  );

  FileBrowserOpenCancelled.set(false);
});

class FileBrowserClass {
  public async refresh(clearFirst = true) {
    Log({
      source: "FileBrowser: refresh",
      msg: "Refreshing current directory contents",
      level: LogLevel.info,
    });

    if (clearFirst) FileBrowserDirContents.set(defaultDirectory);

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

    await this.refresh();

    FileBrowserSelectedFilename.set(null);
  }
}

export const fbClass = new FileBrowserClass();
