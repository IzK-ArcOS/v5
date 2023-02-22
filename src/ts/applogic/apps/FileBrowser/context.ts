import type { App, AppContextMenu } from "../../interface";
import { fbClass } from "./main";

export const FileManagerContextMenu: AppContextMenu = {
  ".item.dir": [
    {
      caption: "Open",
      action: (_: App, data: DOMStringMap) => {
        const path = data.path;

        if (!path) return;

        fbClass.goToDirectory(path);
      },
    },
  ],
  ".item.file": [
    {
      caption: "Open",
      action: (_: App, data: DOMStringMap) => {
        const path = data.path;

        if (!path) return;

        console.log(_, data, path);
      },
    },
  ],
};
