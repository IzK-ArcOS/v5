import { createDirectory } from "../../../api/fs/directory";
import { writeFile } from "../../../api/fs/file";
import { getServer } from "../../../api/server";
import { createOverlayableError } from "../../../errorlogic/overlay";
import { ThemesIcon } from "../../../icon/general";
import { deleteCustomTheme } from "../../../userlogic/themes/main";
import { showOverlay } from "../../../window/overlay";
import { openWindow } from "../../events";
import type { AppContextMenu } from "../../interface";
import { fbClass, fbState } from "../FileBrowser/main";

const saveToFS = {
  caption: "Save to ArcFS",
  action: async (_, data) => {
    const blob = new Blob([JSON.stringify(JSON.parse(data.json), null, 2)], {
      type: "application/json",
    });

    await createDirectory("./Themes");

    const filename = `${data.name}.arctheme`;
    const path = `./Themes/${filename}`;

    await writeFile(path, blob);

    openWindow("FileManager");

    await fbClass.goToDirectory("./Themes");

    setTimeout(() => {
      fbState.update((v) => {
        v.selectedFilename = filename;

        return v;
      });
    });
  },
  icon: "save",
};

export const SettingsAppContext: AppContextMenu = {
  "themerenderer-user": [
    {
      caption: "Delete",
      action: (_, data) => {
        createOverlayableError(
          {
            title: "Delete theme?",
            message: "Are you sure you want to delete this theme?",
            image: ThemesIcon,
            buttons: [
              {
                caption: "Delete",
                action() {
                  deleteCustomTheme(data["id"]);
                },
                suggested: true,
              },
              { caption: "Cancel", action() {} },
            ],
          },
          "SettingsApp"
        );
      },
      icon: "delete",
    },
    saveToFS,
  ],

  "themerenderer-system": [saveToFS],

  "accountpage-hostname": [
    {
      caption: "View user data",
      action: () => {
        showOverlay("udataExplorer", "SettingsApp");
      },
      icon: "account_tree",
    },
    {
      caption: "Copy server",
      action: () => {
        navigator.clipboard.writeText(getServer() || "localhost");
      },
      icon: "copy",
    },
  ],
  "appearance-accentselector": [
    {
      caption: "Copy color code",
      action: (_, data) => {
        navigator.clipboard.writeText(`#${data["hex"]}`);
      },
      icon: "copy",
    },
  ],
};
