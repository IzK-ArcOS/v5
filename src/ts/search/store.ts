import { get } from "svelte/store";
import { currentSettingsPage } from "../applogic/apps/SettingsApp/main";
import { SettingsPages } from "../applogic/apps/SettingsApp/store";
import { openWindow } from "../applogic/events";
import { WindowStore } from "../applogic/store";
import { restart, shutdown } from "../desktop/power";
import type { SearchItem } from "./interface";
import shutdownIcon from "../../assets/apps/exit.svg";
import searchIcon from "../../assets/arcfind.svg";
import fileIcon from "../../assets/mimetypes/text-plain.svg";
import { apiCall, ConnectedServer } from "../api/main";
import { UserToken } from "../userlogic/interfaces";
import type { UserFile } from "../api/interface";
import { openUserFile, openWithDialog } from "../api/fs/open";
import {
  closeNotification,
  deleteNotification,
  makeNotification,
} from "../notiflogic/main";

let FILE_CACHE: SearchItem[] = [];

export async function getSearchItems(): Promise<SearchItem[]> {
  const apps = compileSearchableApps();
  const settings = compileSearchableSettingsPages();
  const powerOpt: SearchItem[] = POWER_OPTIONS;
  const files: SearchItem[] = await getFiles();

  return [...apps, ...settings, ...powerOpt, ...files];
}

export async function getFiles() {
  if (FILE_CACHE.length) return FILE_CACHE;

  const server = get(ConnectedServer);

  if (!server) return [];

  const result: SearchItem[] = [];
  const req = await apiCall(server, "fs/tree", {}, get(UserToken));
  const files = req.data as UserFile[];

  for (let i = 0; i < files.length; i++) {
    result.push({
      caption: files[i].filename,
      action: async () => {
        const notif = makeNotification({
          title: "Loading file",
          message: `Loading file ${files[i].filename} from the ArcAPI. This can take a while, depending on your internet connection and the size of the file.`,
          buttons: [],
          image: searchIcon,
        });

        const scope = files[i].scopedPath;

        if (scope.startsWith("./"))
          files[i].scopedPath = scope.replace("./", "");

        const file = await openUserFile(files[i]);

        deleteNotification(notif);
        closeNotification();

        WindowStore.set(get(WindowStore));

        if (file == true) return;

        openWithDialog({ ...file, anymime: true });
      },
      description: files[i].scopedPath.replace(`/${files[i].filename}`, ""),
      image: fileIcon,
    });
  }

  return result;
}

export function compileSearchableApps(): SearchItem[] {
  const result: SearchItem[] = [];

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].info.hidden || ws[i].info.custom) continue;

    result.push({
      caption: ws[i].info.name,
      description: ws[i].info.description,
      image: ws[i].info.icon,
      action: () => {
        openWindow(ws[i].id);
      },
    });
  }

  return result;
}

export function compileSearchableSettingsPages(): SearchItem[] {
  const result: SearchItem[] = [];
  const pages = SettingsPages;

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];

    result.push({
      image: page.icon,
      caption: page.name,
      action: () => {
        openWindow("SettingsApp");

        setTimeout(() => {
          currentSettingsPage.set(page);
        });
      },
    });
  }

  return result;
}

const POWER_OPTIONS: SearchItem[] = [
  {
    caption: "Shutdown",
    description: "Leave the desktop and turn off ArcOS",
    action: shutdown,
    image: shutdownIcon,
  },
  {
    caption: "Restart",
    description: "Leave the desktop and reload ArcOS",
    action: restart,
    image: shutdownIcon,
  },
];
