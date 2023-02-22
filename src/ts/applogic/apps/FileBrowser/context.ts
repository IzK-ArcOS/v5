import type { App, AppContextMenu } from "../../interface";
import { fbClass } from "./main";

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
      caption: "Rename",
      action: (_: App, data: DOMStringMap) => {
        const path = data.path;

        if (!path) return;

        fbClass.goToDirectory(path);
      },
    },
    {
      caption: "Copy",
      action: (_: App, data: DOMStringMap) => {
        const path = data.path;

        if (!path) return;

        fbClass.goToDirectory(path);
      },
    },
    {
      caption: "Cut",
      action: (_: App, data: DOMStringMap) => {
        const path = data.path;

        if (!path) return;

        fbClass.goToDirectory(path);
      },
    },
  ],
  ".item.file": [
    {
      caption: "Delete",
      action: (_: App, data: DOMStringMap) => {
        const path = data.path;

        if (!path) return;

        console.log(_, data, path);
      },
    },
  ],
};
