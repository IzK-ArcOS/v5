import { get } from "svelte/store";
import { closeWindow } from "../applogic/events";
import { WindowStore } from "../applogic/store";
import { CurrentNotification, NotificationStore } from "../notiflogic/main";
import { loggingOff, restarting, shuttingDown } from "./main";

export function logoff() {
  closeAllWindows();
  resetVars();

  loggingOff.set(true);
}

export function shutdown() {
  closeAllWindows();
  resetVars();

  shuttingDown.set(true);
}

export function restart() {
  closeAllWindows();
  resetVars();

  restarting.set(true);
}

function closeAllWindows() {
  let maxTimeout = 0;
  const ws = get(WindowStore);
  const windows = Object.values(ws);

  for (let i = 0; i < windows.length; i++) {
    maxTimeout += 50;

    setTimeout(() => {
      closeWindow(ws[i].id);
    }, maxTimeout);
  }
}

function resetVars() {
  CurrentNotification.set(undefined);
  NotificationStore.set({});
  WindowStore.set({});
}
