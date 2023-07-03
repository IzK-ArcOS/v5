import { get, writable } from "svelte/store";
import { ConnectedServer } from "../../api/main";
import { Log, LogLevel } from "../../console";
import { ErrorMessages } from "../../errorlogic/app";
import { closeErrorProcess, errorMessage } from "../../errorlogic/main";
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
  UserData,
  UserName,
} from "../../userlogic/interfaces";
import { hideOverlay, showOverlay } from "../../window/overlay";
import {
  closeProcess,
  toggleWindowFullscreenization,
  toggleHeadlessWindowProperty,
  toggleWindowMaximization,
  toggleWindowMinimization,
  createProcess,
} from "../events";
import { loadApp } from "../load";
import { AppStore } from "../store";
import type { ExtendedWindow } from "./interface";
import { loadExternalApp } from "./loader";

export function assignHooks() {
  const win = window as ExtendedWindow;

  win.__arcos = {
    loadWindow: loadApp,
    loadExternalApp,
    api: {
      apiHost: ConnectedServer,
    },
    userLogic: {
      username: UserName,
      userData: UserData,
    },
    windowLogic: {
      createProcess,
      closeProcess,
      toggleWindowMaximization,
      toggleWindowMinimization,
      toggleWindowFullscreenization: toggleWindowFullscreenization,
      toggleHeadlessWindowProperty,
      appStore: AppStore,
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
      closeError: closeErrorProcess,
      createOverlayableError,
      destroyOverlayableError,
    },
  };
}
