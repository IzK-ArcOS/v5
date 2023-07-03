import { createOverlayableError } from "../../../errorlogic/overlay";
import { showOverlay } from "../../../window/overlay";
import type { App, AppContextMenu, ContextMenuItem } from "../../interface";
import {
  fbClass,
  FileBrowserCopyingFilename,
  FileBrowserCurrentDir,
  FileBrowserCuttingFilename,
  FileBrowserSelectedFilename,
} from "./main";
import trash from "../../../../assets/apps/logger/clear.svg";
import { get } from "svelte/store";
import { SEP_ITEM } from "../../../contextmenu/main";
import { getPID } from "../../pid";

export const FileManagerContextMenu: AppContextMenu = {
  "listitem-dir": [
    {
      icon: "launch",
      caption: "Open",
      action: (_: App, data: DOMStringMap) => {
        const path = data.path;

        if (!path) return;

        fbClass.goToDirectory(path);
      },
    },
    {
      icon: "drive_file_rename_outline",
      caption: "Rename",
      action: (_: App, data: DOMStringMap) => {
        FileBrowserSelectedFilename.set(data.name);

        showOverlay("renameItem", getPID("FileManager"));
      },
    },
    {
      icon: "content_copy",
      caption: "Copy",
      action: (_: App, data: DOMStringMap) => {
        FileBrowserSelectedFilename.set(data.name);

        FileBrowserCopyingFilename.set({
          name: data.name,
          scopedPath: `${data.path}`,
        });
      },
    },
    {
      icon: "content_cut",
      caption: "Cut",
      action: (_: App, data: DOMStringMap) => {
        FileBrowserSelectedFilename.set(data.name);

        FileBrowserCuttingFilename.set({
          name: data.name,
          scopedPath: `${data.path}`,
        });
      },
    },
  ],
  "listitem-file": [
    {
      caption: "Delete",
      action: (_: App, data: DOMStringMap) => {
        createOverlayableError(
          {
            title: "Delete item?",
            message: `Are you sure you want to permanently delete ${data.name}?`,
            buttons: [
              {
                caption: "Delete",
                action: async () => {
                  fbClass.deleteItem(data["name"], data["path"]);
                },
              },
              { caption: "Cancel", action() {} },
            ],
            image: trash,
          },
          getPID("FileManager")
        );
      },
    },
  ],
};

const listitemContext: ContextMenuItem[] = [
  {
    icon: "content_cut",
    action(window, data, scope) {
      const cdir = get(FileBrowserCurrentDir);
      const path = `${cdir}/${data["name"]}`;
      const name = data["name"];

      FileBrowserCuttingFilename.set({
        name,
        scopedPath: path,
      });
    },
  },
  {
    icon: "copy",
    action(window, data, scope) {
      const cdir = get(FileBrowserCurrentDir);
      const path = `${cdir}/${data["name"]}`;
      const name = data["name"];

      FileBrowserCopyingFilename.set({
        name,
        scopedPath: path,
      });
    },
  },
  SEP_ITEM,
  {
    icon: "delete",
    caption: "Delete item",
    action(window, data, scope) {
      const cdir = get(FileBrowserCurrentDir);
      const path = `${cdir}/${data["name"]}`;
      const name = data["name"];

      FileBrowserCopyingFilename.set({
        name,
        scopedPath: path,
      });
    },
  },
];
