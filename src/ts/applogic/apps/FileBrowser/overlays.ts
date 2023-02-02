import CreateFolder from "../../../../lib/Apps/FileBrowser/Overlays/CreateFolder.svelte";
import DeletingItem from "../../../../lib/Apps/FileBrowser/Overlays/DeletingItem.svelte";
import OpeningFile from "../../../../lib/Apps/FileBrowser/Overlays/OpeningFile.svelte";
import UploadingFile from "../../../../lib/Apps/FileBrowser/Overlays/UploadingFile.svelte";
import type { OverlayableApp } from "../../interface";

export const fbOverlays: { [key: string]: OverlayableApp } = {
  openingFile: {
    info: {
      name: "Opening File",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: OpeningFile,
    size: { w: 430, h: 165 },
    show: false,
  },
  deletingItem: {
    info: {
      name: "Deleting Item",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: DeletingItem,
    size: { w: 430, h: 75 },
    show: false,
  },
  createFolder: {
    info: {
      name: "Create Folder",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: CreateFolder,
    size: { w: 350, h: 115 },
    show: false,
  },
  uploadingFile: {
    info: {
      name: "Uploading File",
      version: "1.0.0",
      author: "ArcOS Team",
    },
    content: UploadingFile,
    size: { w: 430, h: 140 },
    show: false,
  },
};
