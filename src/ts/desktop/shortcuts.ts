import { get } from "svelte/store";
import { closeProcess, createProcess } from "../applogic/events";
import { registerShortcuts } from "../applogic/keyboard/main";
import {
  ProcessStore,
  focusedProcessPid,
  isFullscreenWindow,
} from "../applogic/store";
import { startOpened } from "./main";
import { actionCenterOpened } from "./actioncenter/main";
import { CurrentNotification } from "../notiflogic/main";
import { showArcFind } from "../search/main";

export function registerDesktopShortcuts() {
  registerShortcuts(0, [
    {
      key: "q",
      alt: true,
      action() {
        const processStore = get(ProcessStore);
        if (!processStore) {
          createProcess("Exit");
        } else {
          const focusedWindowPid = get(focusedProcessPid);
          const window = processStore[focusedWindowPid];

          if (window.windowState.fullscreen) isFullscreenWindow.set(false);

          closeProcess(focusedWindowPid);
        }

        startOpened.set(false);
        actionCenterOpened.set(false);
        CurrentNotification.set(null);

        focusedProcessPid.set(null);
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
        actionCenterOpened.set(!get(actionCenterOpened));
      },
    },
    {
      key: "z",
      alt: true,
      shift: true,
      global: true,
      action: () => {
        createProcess("AppMan");
      },
    },
  ]);
}
