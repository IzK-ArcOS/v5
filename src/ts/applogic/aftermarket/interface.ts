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
      createOverlayableError(error: OverlayableError, targetPid: number): boolean;
      destroyOverlayableError(errorId: number, ownerPid: number): boolean;
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
      appStore: Writable<{[id:string]: App}>;
      createProcess(appId: string, parentPid?: number): number | null;
      closeProcess(pid: number);
      toggleWindowMaximization(pid: number);
      toggleWindowMinimization(pid: number);
      toggleWindowFullscreenization(pid: number);
      toggleHeadlessWindowProperty(pid: number);
    };
    overlay: {
      showOverlay(id: number, parentPid: number): boolean;
      hideOverlay(id: number, parentPid: number): boolean;
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
