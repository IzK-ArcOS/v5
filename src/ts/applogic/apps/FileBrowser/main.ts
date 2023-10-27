import { get, writable } from "svelte/store";
import { partialFileToComplete } from "../../../api/fs/convert";
import { deleteItem } from "../../../api/fs/delete";
import { getDirectory } from "../../../api/fs/directory";
import { openUserFile, openWithDialog } from "../../../api/fs/open/main";
import {
  ArcFile,
  PartialArcFile,
  defaultDirectory,
} from "../../../api/interface";
import { Log } from "../../../console";
import { LogLevel } from "../../../console/interface";
import { ArcSoundBus } from "../../../sound/main";
import { hideOverlay, showOverlay } from "../../../window/overlay";
import {
  DeleteFailed,
  DirectoryNotFound,
  FileOpenFailed,
  OpenCancelled,
} from "./error";
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

  OpenCancelled();

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

    if (!req) {
      DirectoryNotFound(cd);
    }

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

    if (!valid) DeleteFailed();

    fbState.update((v) => {
      v.selectedFilename = null;
      return v;
    });

    fbClass.refresh();

    setTimeout(() => {
      hideOverlay("deletingItem", "FileManager");
    }, 100);
  }

  public setOpeningFile(file: PartialArcFile) {
    fbState.update((v) => {
      v.openingFile = file;

      return v;
    });
  }

  async openFile(file: PartialArcFile) {
    this.setOpeningFile(file);

    showOverlay("openingFile", "FileManager");

    let openResult = await openUserFile(file);

    hideOverlay("openingFile", "FileManager");

    this.setOpeningFile(null);

    if (openResult != true) {
      const x = openResult;
      FileOpenFailed(file, x);
    }

    openResult = null;
  }

  public openWithAny(arc: ArcFile) {
    openWithDialog({ ...arc, anymime: true });
  }

  public async openWith(file: PartialArcFile) {
    this.setOpeningFile(file);

    showOverlay("openingFile", "FileManager");

    const data = await partialFileToComplete(file);

    this.openWithAny(data);

    hideOverlay("openingFile", "FileManager");

    this.setOpeningFile(null);
  }
}

export const fbClass = new FileBrowserClass();
