import { get, writable } from "svelte/store";
import { deleteItem } from "../../../api/fs/delete";
import { getDirectory } from "../../../api/fs/directory";
import { defaultDirectory } from "../../../api/interface";
import { Log } from "../../../console";
import { LogLevel } from "../../../console/interface";
import { createOverlayableError } from "../../../errorlogic/overlay";
import { ErrorIcon } from "../../../icon/apps";
import { TrashIcon } from "../../../icon/general";
import { ArcSoundBus } from "../../../sound/main";
import { hideOverlay, showOverlay } from "../../../window/overlay";
import type { FileManagerState } from "./interface";

export const fbState = writable<FileManagerState>({
  currentDir: "./",
  dirContents: defaultDirectory,
  selectedFilename: null,
  openingFile: null,
  deletingFilename: null,
  uploadFile: null,
  openCancelled: false,
  refreshing: false,
  uploadProgress: 0,
  cuttingFilename: null,
  copyingFilename: null,
  home: false,
  populating: false,
});

fbState.subscribe((v) => {
  if (!v || !v.openCancelled) return;

  createOverlayableError(
    {
      title: "Open cancelled",
      message: "The opening procedure was cancelled by the user.",
      buttons: [{ caption: "OK", action() {}, suggested: true }],
      image: ErrorIcon,
    },
    "FileManager"
  );
  fbState.update((v) => {
    v.openCancelled = false;

    return v;
  });
});

class FileBrowserClass {
  public async refresh(clearFirst = true) {
    Log(
      "FileBrowser: refresh",
      "Refreshing current directory contents",
      LogLevel.info
    );

    const state = get(fbState);

    state.refreshing = true;
    fbState.set(state);

    if (clearFirst) {
      state.dirContents = defaultDirectory;
      state.selectedFilename = null;

      fbState.set(state);
    }

    const cd = get(fbState).currentDir;
    const req = await getDirectory(cd);

    state.dirContents = req || { ...defaultDirectory, scopedPath: cd };
    state.refreshing = false;

    fbState.set(state);
  }

  public async goToDirectory(path: string, disableHome = true) {
    Log("FileBrowser: goToDirectory", `Navigating to "${path}"`);

    fbState.update((state) => {
      state.selectedFilename;
      state.currentDir = path;

      ArcSoundBus.playSound("arcos.click");

      if (disableHome) state.home = false;

      return state;
    });

    await this.refresh();
  }

  public async deleteItem(name: string, path: string) {
    fbState.update((v) => {
      v.deletingFilename = name;
      return v;
    });

    showOverlay("deletingItem", "FileManager");

    const valid = await deleteItem(path);

    if (!valid)
      createOverlayableError(
        {
          title: "Unable to delete item",
          message:
            "ArcAPI was not able to delete the item from the file system. A permission error may have occured. Please try again later.",
          buttons: [{ caption: "OK", action() {}, suggested: true }],
          image: TrashIcon,
        },
        "FileManager"
      );

    fbState.update((v) => {
      v.selectedFilename = null;
      return v;
    });

    fbClass.refresh();

    setTimeout(() => {
      hideOverlay("deletingItem", "FileManager");
    }, 100);
  }
}

export const fbClass = new FileBrowserClass();
