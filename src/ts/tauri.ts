import { getVersion } from "@tauri-apps/api/app";
import { listen, TauriEvent } from "@tauri-apps/api/event";
import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { appWindow } from "@tauri-apps/api/window";

const blocks = ["Ctrl+R", "F5", "Ctrl+Shift+R", "Ctrl+P", "F3", "Ctrl+F"];

export async function define() {
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
  try {
    const ver = await getVersion();

    return !!(ver || "");
  } catch {
    return false;
  }
}
