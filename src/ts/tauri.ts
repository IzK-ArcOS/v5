import { getVersion } from "@tauri-apps/api/app";
import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";

export async function define() {
  unregisterAll();
  register("Ctrl+R", unset);
  register("F5", unset);
  register("Ctrl+Shift+R", unset);

  register("Alt+Enter", async () => {
    const isFull = await appWindow.isFullscreen();

    await appWindow.setFullscreen(!isFull);
  });
}

function unset() {
  return false;
}

export async function inTauri() {
  try {
    const ver = await getVersion();

    return !!(ver || "");
  } catch {
    return false;
  }
}
