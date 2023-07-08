import { getVersion } from "@tauri-apps/api/app";
import { listen, TauriEvent } from "@tauri-apps/api/event";
import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";
import { Log } from "./console";
import { LogLevel } from "./console/interface";

/**
 * WARNING:
 *
 * This file will soon be discarded when ArcOS transitions from Tauri to
 * Electron. Issues related to this file will be ignored.
 *
 * - IzKuipers, July 2nd 11:14 AM -
 * UTC+2
 */

const blocks = ["Ctrl+R", "F5", "Ctrl+Shift+R", "Ctrl+P", "F3", "Ctrl+F", "F7"];

export async function define() {
  if (!window["__TAURI_IPC__"])
    return Log({
      msg: "Not binding Tauri definitions: not in Tauri",
      level: LogLevel.warn,
      source: "tauri.ts: define",
    });

  doRegister();

  listen(TauriEvent.WINDOW_BLUR, unregisterAll);
  listen(TauriEvent.WINDOW_FOCUS, doRegister);
}

function doRegister() {
  unregisterAll();

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    register(block, unset);
  }

  register("Alt+Enter", async () => {
    const isFull = await appWindow.isFullscreen();

    await appWindow.setFullscreen(!isFull);
  });
}

function unset() {
  if (document.hasFocus()) return false;
}

export async function inTauri() {
  if (!window["__TAURI_IPC__"]) return false;

  try {
    const ver = await getVersion();

    return !!(ver || "");
  } catch {
    return false;
  }
}

export function setWindowTitle(title: string) {
  if (!window["__TAURI_IPC__"]) return false;

  appWindow.setTitle(title);

  return true;
}
