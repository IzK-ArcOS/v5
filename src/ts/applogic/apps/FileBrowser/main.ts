import { get, writable } from "svelte/store";
import { deleteItem } from "../../../api/fs/delete";
import { getDirectory } from "../../../api/fs/directory";
import {
  ArcFile,
  PartialArcFile,
  PartialUserDir,
  UserDirectory,
  defaultDirectory,
} from "../../../api/interface";
import { Log } from "../../../console";
import { LogLevel } from "../../../console/interface";
import { createOverlayableError } from "../../../errorlogic/overlay";
import { ErrorIcon } from "../../../icon/apps";
import { TrashIcon } from "../../../icon/main";
import { ArcSoundBus } from "../../../sound/main";
import { hideOverlay, showOverlay } from "../../../window/overlay";

export let FileBrowserCurrentDir = writable<string>("./");
export let FileBrowserDirContents = writable<UserDirectory>(defaultDirectory);
export let FileBrowserSelectedFilename = writable<string>(null);
export let FileBrowserOpeningFile = writable<PartialArcFile>(null);
export let FileBrowserDeletingFilename = writable<string>(null);
export let FileBrowserUploadFile = writable<ArcFile>(null);
export let FileBrowserOpenCancelled = writable<boolean>(false);
export let FileBrowserRefreshing = writable<boolean>(false);
export let FileBrowserUploadProgress = writable<number>(0);
export let FileBrowserCuttingFilename = writable<PartialUserDir>(null);
export let FileBrowserCopyingFilename = writable<PartialUserDir>(null);
export let FileBrowserHome = writable<boolean>(false);

FileBrowserOpenCancelled.subscribe((v) => {
  if (!v) return;

  createOverlayableError(
    {
      title: "Open cancelled",
      message: "The opening procedure was cancelled by the user.",
      buttons: [{ caption: "OK", action() {} }],
      image: ErrorIcon,
    },
    "FileManager"
  );

  FileBrowserOpenCancelled.set(false);
});

class FileBrowserClass {
  public async refresh(clearFirst = true) {
    Log(
      "FileBrowser: refresh",
      "Refreshing current directory contents",
      LogLevel.info
    );

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

  public async goToDirectory(path: string, disableHome = true) {
    Log("FileBrowser: goToDirectory", `Navigating to "${path}"`);

    FileBrowserSelectedFilename.set(null);

    FileBrowserCurrentDir.set(path);

    ArcSoundBus.playSound("arcos.click");

    await this.refresh();

    if (disableHome) FileBrowserHome.set(false);
  }

  public async deleteItem(name: string, path: string) {
    FileBrowserDeletingFilename.set(name);

    showOverlay("deletingItem", "FileManager");

    const valid = await deleteItem(path);

    if (!valid)
      createOverlayableError(
        {
          title: "Unable to delete item",
          message:
            "ArcAPI was not able to delete the item from the file system. A permission error may have occured. Please try again later.",
          buttons: [{ caption: "OK", action() {} }],
          image: TrashIcon,
        },
        "FileManager"
      );

    FileBrowserSelectedFilename.set(null);

    fbClass.refresh();

    setTimeout(() => {
      hideOverlay("deletingItem", "FileManager");
    }, 100);
  }
}

export const fbClass = new FileBrowserClass();
