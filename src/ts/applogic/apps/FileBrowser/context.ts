import { partialFileToComplete } from "../../../api/fs/convert";
import { deleteItem } from "../../../api/fs/delete";
import { DownloadFile } from "../../../api/fs/download";
import { getPartialFile } from "../../../api/fs/file";
import { getParentDirectory } from "../../../api/fs/main";
import {
  isDirPinned,
  pinDirectory,
  unpinDirectory,
} from "../../../api/fs/pins/dir";
import { isFilePinned, pinFile, unpinFile } from "../../../api/fs/pins/file";
import { SEP_ITEM } from "../../../contextmenu/main";
import { createOverlayableError } from "../../../errorlogic/overlay";
import { TrashIcon } from "../../../icon/general";
import { OpenInNewIcon } from "../../../icon/handlers";
import { hideOverlay, showOverlay } from "../../../window/overlay";
import type { App, AppContextMenu } from "../../interface";
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
      icon: "launch",
      caption: "Open File",
      action: async (_: App, data: DOMStringMap) => {
        if (!data || !data.path) return;

        const partial = await getPartialFile(data.path);

        if (!partial) return;

        fbClass.openFile(partial);
      },
    },
    {
      image: OpenInNewIcon,
      caption: "Download",
      action: async (_: App, data: DOMStringMap) => {
        if (!data || !data.path) return;

        showOverlay("openingFile", "FileManager");

        const partial = await getPartialFile(data.path);

        if (!partial) return;

        fbClass.setOpeningFile(partial);
        showOverlay("openingFile", "FileManager");

        const full = await partialFileToComplete(partial);

        DownloadFile(full);

        fbClass.setOpeningFile(null);
        hideOverlay("openingFile", "FileManager");
      },
    },
    SEP_ITEM,
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
  "homepage-folder": [
    {
      caption: "Open Folder",
      icon: "launch",
      action(_, data) {
        const path = data.path;

        if (!path) return;

        fbClass.goToDirectory(path);
      },
    },
    {
      caption: "Find Parent",
      action(_, data) {
        const path = data.path;

        if (!path) return;

        const parent = getParentDirectory(path);

        fbClass.goToDirectory(parent || path);
      },
    },
    SEP_ITEM,
    {
      caption: "Unpin Folder",
      icon: "block",
      action(_, data) {
        unpinDirectory(data.path);
      },
    },
  ],
  "homepage-file": [
    {
      caption: "Open File",
      icon: "launch",
      async action(_, data) {
        const path = data.path;

        if (!path) return;

        const partial = await getPartialFile(path);

        if (!partial) return;

        fbClass.openFile(partial);
      },
    },
    {
      caption: "Find Parent",
      action(_, data) {
        const path = data.path;

        if (!path) return;

        const parent = getParentDirectory(path);

        fbClass.goToDirectory(parent || path);
      },
    },
    SEP_ITEM,
    {
      caption: "Unpin File",
      icon: "block",
      action(_, data) {
        unpinFile(data.path);
      },
    },
  ],
};
