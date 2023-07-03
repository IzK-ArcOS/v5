import type { PartialArcFile } from "../../api/interface";
import { ConnectedServer, apiCall } from "../../api/main";
import {
  closeNotification,
  deleteNotification,
  makeNotification,
} from "../../notiflogic/main";
import type { SearchItem } from "../interface";
import searchIcon from "../../../assets/arcfind.svg";
import fileIcon from "../../../assets/mimetypes/text-plain.svg";
import { get } from "svelte/store";
import { UserToken } from "../../userlogic/interfaces";
import { openUserFile, openWithDialog } from "../../api/fs/open";
import { AppStore } from "../../applogic/store";
import { FileBrowserCurrentDir } from "../../applogic/apps/FileBrowser/main";

let FILE_CACHE: SearchItem[] = [];

export async function compileSearchableFiles() {
  /* if (FILE_CACHE.length && FILE_CACHE[0]) return FILE_CACHE;
   */
  const server = get(ConnectedServer);

  if (!server) return [];

  const result: SearchItem[] = [];
  const req = await apiCall(server, "fs/tree", {}, get(UserToken));
  const files = req.data as PartialArcFile[];

  for (let i = 0; i < files.length; i++) {
    result.push({
      caption: files[i].filename,
      action: async () => {
        const notif = makeNotification({
          title: "Loading file",
          message: `Loading file ${files[i].scopedPath} from the ArcAPI. This can take a while, depending on your internet connection and the size of the file.`,
          buttons: [],
          image: searchIcon,
        });

        const scope = files[i].scopedPath;

        if (scope.startsWith("./"))
          files[i].scopedPath = scope.replace("./", "");

        const file = await openUserFile(files[i]);

        deleteNotification(notif);
        closeNotification();

        AppStore.set(get(AppStore));

        if (file == true) return;

        openWithDialog({ ...file, anymime: true });
      },
      description: files[i].scopedPath.replace(`/${files[i].filename}`, ""),
      image: fileIcon,
    });
  }

  FILE_CACHE = result;

  return result;
}

FileBrowserCurrentDir.subscribe(() => {
  FILE_CACHE = [];
});
