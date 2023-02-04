import { get, writable } from "svelte/store";
import warning from "../../../../assets/apps/error.svg";
import { getDirectory } from "../../../api/fs/directory";
import {
  defaultDirectory,
  PartialUserDir,
  UserDirectory,
  UserFile,
} from "../../../api/interface";
import { Log, LogLevel } from "../../../console";
import { createOverlayableError } from "../../../errorlogic/overlay";
import type { ArcFile } from "../../interface";

export let FileBrowserCurrentDir = writable<string>("./");
export let FileBrowserDirContents = writable<UserDirectory>(defaultDirectory);
export let FileBrowserSelectedFilename = writable<string>(null);
export let FileBrowserOpeningFile = writable<UserFile>(null);
export let FileBrowserDeletingFilename = writable<string>(null);
export let FileBrowserUploadFile = writable<ArcFile>(null);
export let FileBrowserOpenCancelled = writable<boolean>(false);
export let FileBrowserRefreshing = writable<boolean>(false);
export let FileBrowserUploadProgress = writable<number>(0);
export let FileBrowserCuttingFilename = writable<PartialUserDir>(null);
export let FileBrowserCopyingFilename = writable<PartialUserDir>(null);

FileBrowserOpenCancelled.subscribe((v) => {
  if (!v) return;

  createOverlayableError(
    {
      title: "Open cancelled",
      message: "The opening procedure was cancelled by the user.",
      buttons: [{ caption: "OK", action() {} }],
      image: warning,
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

    FileBrowserRefreshing.set(true);

    if (clearFirst) {
      FileBrowserDirContents.set(defaultDirectory);
      FileBrowserSelectedFilename.set(null);
    }

    const cd = get(FileBrowserCurrentDir);

    const req = await getDirectory(cd);

    FileBrowserDirContents.set(req || { ...defaultDirectory, scopedPath: cd });

    FileBrowserRefreshing.set(false);
  }

  public async goToDirectory(path: string) {
    Log({
      source: "FileBrowser: goToDirectory",
      msg: `Navigating to "${path}"`,
      level: LogLevel.info,
    });

    FileBrowserSelectedFilename.set(null);

    FileBrowserCurrentDir.set(path);

    await this.refresh();
  }
}

export const fbClass = new FileBrowserClass();
