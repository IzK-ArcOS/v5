import type { ErrorMessage } from "../../errorlogic/app";
import type { NotificationStore } from "../../notiflogic/interfaces";
import type { UserData } from "../../userlogic/interfaces";
import type { App } from "../interface";

export type ExtendedWindow = {
  __arcos: {
    loadWindow: (id: string, app: App) => void;
    loadExternalApp: (info: ExternalAppLoaderContent) => void;
    windowStore: App[];
    notifications: NotificationStore;
    errorStore: ErrorMessage[];
    username: string;
    userData: UserData;
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
