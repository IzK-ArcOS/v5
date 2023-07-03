import { get } from "svelte/store";
import { logoffToken } from "../api/cred";
import { defaultDirectory } from "../api/interface";
import {
  FileBrowserCurrentDir,
  FileBrowserDeletingFilename,
  FileBrowserDirContents,
  FileBrowserSelectedFilename,
} from "../applogic/apps/FileBrowser/main";
import { closeProcess } from "../applogic/events";
import { AppStore, ProcessStore } from "../applogic/store";
import { ErrorMessages, ErrorProcesses } from "../errorlogic/app";
import { selectedMessageId } from "../messaging/main";
import { NotificationStore } from "../notiflogic/main";
import { restarting, shuttingDown } from "./main";

export function logoff() {
  closeAllProcesses();

  FileBrowserCurrentDir.set("./");
  FileBrowserSelectedFilename.set(null);
  FileBrowserDirContents.set(defaultDirectory);
  FileBrowserDeletingFilename.set(null);
  NotificationStore.set({});
  ErrorProcesses.set([]);
  ErrorMessages.set([]);
  AppStore.set({});
  ProcessStore.set({})
  selectedMessageId.set(null);
}

export function shutdown() {
  closeAllProcesses();

  logoffToken();

  shuttingDown.set(true);
}

export function restart(eraseToken = false) {
  closeAllProcesses();

  if (eraseToken) {
    localStorage.removeItem("arcos-remembered-token");
    logoffToken();
  }

  restarting.set(true);
}

export function closeAllProcesses() {
  let maxTimeout = 0;

  const processes = Object.entries(get(ProcessStore));

  for (let i = 0; i < processes.length; i++) {
    maxTimeout += 50;

    setTimeout(() => {
      closeProcess(processes[i][1].id);
    }, maxTimeout);
  }

}
