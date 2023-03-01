import { get, writable } from "svelte/store";
import { AppPokerData } from "../applogic/apps/AppManager/Manager";
import { closeWindow, openWindow } from "../applogic/events";
import { registerShortcuts } from "../applogic/keyboard/main";
import {
  focusedWindowId,
  getOpenedStore,
  getWindow,
  isFullscreenWindow,
} from "../applogic/store";
import { CurrentNotification } from "../notiflogic/main";
import { showArcFind } from "../search/main";
import { applyState } from "../state/main";
import { UserData } from "../userlogic/interfaces";
import { reloadApps } from "../window/reload";
import { ActionCenterOpened } from "./actioncenter/main";

export const startOpened = writable<boolean>(false);
export const loggingOff = writable<boolean>(false);
export const shuttingDown = writable<boolean>(false);
export const restarting = writable<boolean>(false);

export const showDesktop = writable<boolean>(false);
export const desktopClassNames = writable<string>("");

export function assignDesktopListeners() {
  UserData.subscribe((v) => {
    if (v) {
      const udata = v;

      let classes = "";

      if (udata.sh.taskbar.docked) classes += `tbdocked `;
      if (!udata.sh.anim) classes += `noani `;
      if (udata.sh.noGlass) classes += `noglass `;
      if (udata.sh.window.bigtb) classes += `bigtitlebars `;
      if (udata.sh.desktop.sharp) classes += `sharp `;

      desktopClassNames.set(classes);
    }
  });

  AppPokerData.subscribe((v) => {
    if (v) openWindow("AppPoker");
    else closeWindow("AppPoker");
  });

  loggingOff.subscribe((v) => {
    if (v) {
      showDesktop.set(false);

      setTimeout(() => {
        applyState("logoff");

        loggingOff.set(false);
      }, 500);
    }
  });

  restarting.subscribe((v) => {
    if (v) {
      showDesktop.set(false);

      setTimeout(() => {
        applyState("restart");

        restarting.set(false);
      }, 500);
    }
  });

  shuttingDown.subscribe((v) => {
    if (v) {
      showDesktop.set(false);

      setTimeout(() => {
        applyState("shutdown");

        shuttingDown.set(false);
      }, 500);
    }
  });

  registerShortcuts([
    {
      key: "q",
      alt: true,
      action() {
        if (!getOpenedStore().length) {
          openWindow("Exit");
        } else {
          const window = getWindow(get(focusedWindowId));

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
      key: "r",
      alt: true,
      shift: true,
      action() {
        startOpened.set(false);
        ActionCenterOpened.set(false);

        reloadApps();

        setTimeout(() => {
          isFullscreenWindow.set(true);
        }, 100);

        setTimeout(() => {
          isFullscreenWindow.set(false);
        }, 1000);
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
  ]);
}
