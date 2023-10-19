import { get } from "svelte/store";
import { deleteItem } from "../../../api/fs/delete";
import {
  isDirPinned,
  pinDirectory,
  unpinDirectory,
} from "../../../api/fs/pins/dir";
import { isFilePinned, pinFile, unpinFile } from "../../../api/fs/pins/file";
import { SEP_ITEM } from "../../../contextmenu/main";
import { createOverlayableError } from "../../../errorlogic/overlay";
import { TrashIcon } from "../../../icon/general";
import { showOverlay } from "../../../window/overlay";
import type { App, AppContextMenu, ContextMenuItem } from "../../interface";
import { fbClass, fbState } from "./main";

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
      icon: "push_pin",
      caption: "Pin Folder",
      action: (_: App, data: DOMStringMap) => {
        if (isDirPinned(data.path)) unpinDirectory(data.path);
        else pinDirectory(data.path);
      },
      isActive: (_: App, data: DOMStringMap) => isDirPinned(data.path),
    },
    SEP_ITEM,
    {
      icon: "drive_file_rename_outline",
      caption: "Rename",
      action: (_: App, data: DOMStringMap) => {
        fbState.update((v) => {
          v.selectedFilename = data.name;
          return v;
        });

        showOverlay("renameItem", "FileManager");
      },
    },
    {
      icon: "content_copy",
      caption: "Copy",
      action: (_: App, data: DOMStringMap) => {
        fbState.update((v) => {
          v.selectedFilename = data.name;
          return v;
        });

        fbState.update((v) => {
          v.copyingFilename = {
            name: data.name,
            scopedPath: `${data.path}`,
          };
          return v;
        });
      },
    },
    {
      icon: "content_cut",
      caption: "Cut",
      action: (_: App, data: DOMStringMap) => {
        fbState.update((v) => {
          v.selectedFilename = data.name;
          return v;
        });

        fbState.update((v) => {
          v.cuttingFilename = {
            name: data.name,
            scopedPath: `${data.path}`,
          };
          return v;
        });
      },
    },
    SEP_ITEM,
    {
      image: TrashIcon,
      caption: "Delete",
      action: async (_: App, data: DOMStringMap) => {
        await deleteItem(data.path);

        fbClass.refresh();
      },
    },
  ],
  "listitem-file": [
    {
      icon: "push_pin",
      caption: "Pin File",
      action: (_: App, data: DOMStringMap) => {
        if (isFilePinned(data.path)) unpinFile(data.path);
        else pinFile(data.path);
      },
      isActive: (_: App, data: DOMStringMap) => isFilePinned(data.path),
    },
    SEP_ITEM,
    {
      icon: "drive_file_rename_outline",
      caption: "Rename",
      action: (_: App, data: DOMStringMap) => {
        fbState.update((v) => {
          v.selectedFilename = data.name;
          return v;
        });

        showOverlay("renameItem", "FileManager");
      },
    },
    {
      icon: "content_copy",
      caption: "Copy",
      action: (_: App, data: DOMStringMap) => {
        fbState.update((v) => {
          v.selectedFilename = data.name;
          return v;
        });

        fbState.update((v) => {
          v.copyingFilename = {
            name: data.name,
            scopedPath: `${data.path}`,
          };
          return v;
        });
      },
    },
    {
      icon: "content_cut",
      caption: "Cut",
      action: (_: App, data: DOMStringMap) => {
        fbState.update((v) => {
          v.selectedFilename = data.name;
          return v;
        });

        fbState.update((v) => {
          v.cuttingFilename = {
            name: data.name,
            scopedPath: `${data.path}`,
          };
          return v;
        });
      },
    },
    SEP_ITEM,
    {
      image: TrashIcon,
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
                suggested: true,
              },
              { caption: "Cancel", action() {} },
            ],
            image: TrashIcon,
          },
          "FileManager"
        );
      },
    },
  ],
};

const listitemContext: ContextMenuItem[] = [
  {
    icon: "content_cut",
    action(window, data, scope) {
      const cdir = get(fbState).currentDir;
      const path = `${cdir}/${data["name"]}`;
      const name = data["name"];

      fbState.update((v) => {
        v.cuttingFilename = {
          name,
          scopedPath: path,
        };
        return v;
      });
    },
  },
  {
    icon: "copy",
    action(window, data, scope) {
      const cdir = get(fbState).currentDir;
      const path = `${cdir}/${data["name"]}`;
      const name = data["name"];

      fbState.update((v) => {
        v.copyingFilename = {
          name,
          scopedPath: path,
        };
        return v;
      });
    },
  },
  SEP_ITEM,
  {
    icon: "delete",
    caption: "Delete item",
    action(window, data, scope) {
      const cdir = get(fbState).currentDir;
      const path = `${cdir}/${data["name"]}`;
      const name = data["name"];

      fbState.update((v) => {
        v.copyingFilename = {
          name,
          scopedPath: path,
        };
        return v;
      });
    },
  },
];
