import { get, writable } from "svelte/store";
import { ConnectedServer } from "../../api/main";
import { Log, LogLevel } from "../../console";
import { ErrorMessages } from "../../errorlogic/app";
import { closeError, errorMessage } from "../../errorlogic/main";
import {
  createOverlayableError,
  destroyOverlayableError,
} from "../../errorlogic/overlay";
import {
  closeNotification,
  deleteNotification,
  makeNotification,
  NotificationStore,
} from "../../notiflogic/main";
import {
  defaultUserData,
  UserData,
  UserName,
} from "../../userlogic/interfaces";
import { hideOverlay, showOverlay } from "../../window/overlay";
import {
  closeChildWindow,
  closeWindow,
  fullscreenWindow,
  headlessToggle,
  maximizeWindow,
  minimizeWindow,
  openChildWindow,
  openWindow,
} from "../events";
import { loadWindow } from "../load";
import { WindowStore } from "../store";
import type { ExtendedWindow } from "./interface";
import { loadExternalApp } from "./loader";

let HOOK_UPDATE_COUNT = 0;

export function assignHooks() {
  HOOK_UPDATE_COUNT++;

  Log({
    source: "aftermarket/hooks.ts: assignHooks",
    msg: `Assigning hooks to 'window.__arcos' (count ${HOOK_UPDATE_COUNT})`,
    level: LogLevel.info,
  });

  const win = window as ExtendedWindow;

  win.__arcos = {
    loadWindow,
    loadExternalApp,
    api: {
      apiHost: ConnectedServer,
    },
    userLogic: {
      username: UserName,
      userData: UserData,
    },
    windowLogic: {
      openWindow,
      openChildWindow,
      closeChildWindow,
      closeWindow,
      maximizeWindow,
      minimizeWindow,
      fullscreenWindow,
      headlessToggle,
      windowStore: WindowStore,
    },
    overlay: {
      showOverlay,
      hideOverlay,
    },
    notifier: {
      notifications: NotificationStore,
      errorStore: ErrorMessages,
      makeNotification,
      deleteNotification,
      closeNotification,
      errorMessage,
      closeError,
      createOverlayableError,
      destroyOverlayableError,
    },
  };
}
