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

    if (!isFull) appWindow.setMinSize(new LogicalSize(1000, 650));
  });

  const isFull = await appWindow.isFullscreen();

  if (!isFull) appWindow.setMinSize(new LogicalSize(1000, 650));
}

function unset() {
  return false;
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
