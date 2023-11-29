import { get } from "svelte/store";
import { closeWindow, openWindow } from "../applogic/events";
import { registerShortcuts } from "../applogic/keyboard/main";
import {
  focusedWindowId,
  getOpenedStore,
  getWindow,
  isFullscreenWindow,
} from "../applogic/store";
import { closeError } from "../errorlogic/main";
import { CurrentNotification } from "../notiflogic/main";
import { showArcFind } from "../search/main";
import { ActionCenterOpened } from "./actioncenter/main";
import { startOpened } from "./main";

export function registerDesktopShortcuts() {
  registerShortcuts([
    {
      key: "q",
      alt: true,
      action() {
        const id = get(focusedWindowId);
        if (id && id.startsWith("error_"))
          return closeError(parseInt(id.replace("error_", "")));
        if (!getOpenedStore().length) {
          openWindow("Exit");
        } else {
          const window = getWindow(get(focusedWindowId));

          if (!window) return;

          if (window.state.windowState.fll) isFullscreenWindow.set(false);

          closeWindow(get(focusedWindowId));
        }

        startOpened.set(false);
        ActionCenterOpened.set(false);
        CurrentNotification.set(null);

        focusedWindowId.set(null);
      },
      global: true,
    },
    {
      key: "s",
      shift: true,
      alt: true,
      global: true,
      action: () => {
        showArcFind.set(!get(showArcFind));
      },
    },
    {
      key: "n",
      alt: true,
      global: true,
      action: () => {
        ActionCenterOpened.set(!get(ActionCenterOpened));
      },
    },
    {
      key: "z",
      alt: true,
      shift: true,
      global: true,
      action: () => {
        openWindow("AppMan");
      },
    },
  ]);
}
