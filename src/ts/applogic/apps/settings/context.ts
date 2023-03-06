import { createOverlayableError } from "../../../errorlogic/overlay";
import { deleteCustomTheme } from "../../../userlogic/themes/main";
import type { AppContextMenu } from "../../interface";
import theme from "../../../../assets/apps/settings/themes.svg";

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
};
