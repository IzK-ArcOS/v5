import { get } from "svelte/store";
import { createOverlayableError } from "../../../errorlogic/overlay";
import { hideOverlay, showOverlay } from "../../../window/overlay";
import type { App, AppContextMenu } from "../../interface";
import {
  fbClass,
  FileBrowserCopyingFilename,
  FileBrowserCurrentDir,
  FileBrowserCuttingFilename,
  FileBrowserDeletingFilename,
  FileBrowserSelectedFilename,
} from "./main";
import trash from "../../../../assets/apps/logger/clear.svg";
import { deleteItem } from "../../../api/fs/file";

export const FileManagerContextMenu: AppContextMenu = {
  ".item.dir": [
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

        showOverlay("renameItem", "FileManager");
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
  ".item.file": [
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
                  const path = data.path;

                  FileBrowserDeletingFilename.set(data.name);

                  showOverlay("deletingItem", "FileManager");

                  const valid = await deleteItem(path);

                  if (!valid)
                    createOverlayableError(
                      {
                        title: "Unable to delete item",
                        message:
                          "ArcAPI was not able to delete the item from the file system. A permission error may have occured. Please try again later.",
                        buttons: [{ caption: "OK", action() {} }],
                        image: trash,
                      },
                      "FileManager"
                    );

                  FileBrowserSelectedFilename.set(null);

                  fbClass.refresh();

                  setTimeout(() => {
                    hideOverlay("deletingItem", "FileManager");
                  }, 100);
                },
              },
              { caption: "Cancel", action() {} },
            ],
            image: trash,
          },
          "FileManager"
        );
      },
    },
  ],
};
