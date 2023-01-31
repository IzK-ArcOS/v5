import type { Writable } from "svelte/store";
import type { ErrorButton, ErrorMessage } from "../../errorlogic/app";
import type {
  NotificationData,
  NotificationStore,
} from "../../notiflogic/interfaces";
import type { UserData } from "../../userlogic/interfaces";
import type { App, OverlayableError } from "../interface";

export type ExtendedWindow = {
  __arcos: {
    notifier: {
      makeNotification(data: NotificationData);
      errorMessage(
        title: string,
        message: string,
        image?: string,
        parentId?: string,
        ...buttons: ErrorButton[]
      );
      notifications: Writable<NotificationStore>;
      errorStore: Writable<ErrorMessage[]>;
      deleteNotification(id: string);
      closeNotification();
      closeError(id: number);
      createOverlayableError(error: OverlayableError, targetId: string);
      destroyOverlayableError(errorId: string, ownerId: string);
    };
    api: {
      apiHost: Writable<string>;
    };
    userLogic: {
      username: Writable<string>;
      userData: Writable<UserData>;
    };
    loadWindow: (id: string, app: App) => void;
    loadExternalApp: (info: ExternalAppLoaderContent) => void;
    windowLogic: {
      windowStore: Writable<App[]>;
      openWindow(id: string, openChild?: boolean);
      openChildWindow(parent: App, childId: string);
      closeChildWindow(parent: App, childId: string);
      closeWindow(id: string);
      maximizeWindow(app: App);
      minimizeWindow(app: App);
      fullscreenWindow(app: App);
      headlessToggle(app: App);
    };
    overlay: {
      showOverlay(id: string, parentId: string);
      hideOverlay(id: string, parentId: string);
    };
  };
} & Window &
  typeof globalThis;

export interface ExternalAppLoaderContent {
  meta: ExternalAppMeta;
  js: string;
  css: string;
  id: string;
}

export interface ExternalAppMeta {
  name: string;
  author: string;
  version: string;
}
