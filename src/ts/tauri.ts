import { getVersion } from "@tauri-apps/api/app";
import { register, unregisterAll } from "@tauri-apps/api/globalShortcut";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";

export async function define() {
  unregisterAll();
  register("Ctrl+R", () => {
    return false;
  });
  register("Ctrl+Shift+R", () => {
    return false;
  });

  register("Alt+Enter", async () => {
    const isFull = await appWindow.isFullscreen();

    await appWindow.setFullscreen(!isFull);
  });

  appWindow.setMinSize(new LogicalSize(900, 500));
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
