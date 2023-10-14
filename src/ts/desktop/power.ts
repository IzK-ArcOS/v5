import { logoffToken } from "../api/cred";
import { defaultDirectory } from "../api/interface";
import {
  FileBrowserCurrentDir,
  FileBrowserDeletingFilename,
  FileBrowserDirContents,
  FileBrowserSelectedFilename,
} from "../applogic/apps/FileBrowser/main";
import { closeAllProgressively } from "../applogic/close";
import { WindowStore } from "../applogic/store";
import { ErrorMessages, ErrorWindowStore } from "../errorlogic/app";
import { selectedMessageId } from "../messaging/main";
import { NotificationStore } from "../notiflogic/main";
import { loggingOff, shuttingDown } from "./main";

export function logoff() {
  closeAllProgressively();

  FileBrowserCurrentDir.set("./");
  FileBrowserSelectedFilename.set(null);
  FileBrowserDirContents.set(defaultDirectory);
  FileBrowserDeletingFilename.set(null);
  NotificationStore.set({});
  ErrorWindowStore.set([]);
  ErrorMessages.set([]);
  WindowStore.set([]);
  selectedMessageId.set(null);
}

export function shutdown() {
  closeAllProgressively();

  logoffToken();

  shuttingDown.set(true);
}

export function restart(eraseToken = false) {
  closeAllProgressively();

  if (eraseToken) {
    localStorage.removeItem("arcos-remembered-token");
    logoffToken();
  }

  loggingOff.set(true);
}
