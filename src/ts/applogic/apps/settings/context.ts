import { createOverlayableError } from "../../../errorlogic/overlay";
import { deleteCustomTheme } from "../../../userlogic/themes/main";
import type { AppContextMenu } from "../../interface";
import theme from "../../../../assets/apps/settings/themes.svg";
import { showOverlay } from "../../../window/overlay";
import { get } from "svelte/store";
import { ConnectedServer } from "../../../api/main";

export const SettingsAppContext: AppContextMenu = {
  "themerenderer-user": [
    {
      caption: "Delete",
      action: (_, data) => {
        createOverlayableError(
          {
            title: "Delete theme?",
            message: "Are you sure you want to delete this theme?",
            image: theme,
            buttons: [
              {
                caption: "Delete",
                action() {
                  deleteCustomTheme(data["id"]);
                },
              },
              { caption: "Cancel", action() {} },
            ],
          },
          "SettingsApp"
        );
      },
    },
  ],
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
        navigator.clipboard.writeText(
          localStorage.getItem("arcos-server") || "localhost"
        );
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
