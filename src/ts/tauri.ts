import { appWindow } from "@tauri-apps/api/window";
import { unregister, register } from "@tauri-apps/api/globalShortcut";
import { getVersion } from "@tauri-apps/api/app";

export async function define() {
  unregister("Ctrl+R");
  unregister("Ctrl+Shift+R");

  register("Alt+Enter", async () => {
    const isFull = await appWindow.isFullscreen();

    await appWindow.setFullscreen(!isFull);
  });
}

export async function inTauri() {
  console.log("Getting Tauri information");
  try {
    const ver = await getVersion();

    return !!(ver || "");
  } catch {
    return false;
  }
}
