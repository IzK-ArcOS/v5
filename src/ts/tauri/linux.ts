import { getPID } from "../applogic/pid";
import { Log, LogLevel } from "../console";
import { createOverlayableError } from "../errorlogic/overlay";
import { inTauri } from "../tauri";

export async function checkLinux() {
  Log({
    source: "tauri/linux.ts",
    level: LogLevel.info,
    msg: "Checking if we're in Tauri and if we're on linux...",
  });

  const ua = navigator.userAgent.toLowerCase();

  if (!((await inTauri()) && ua.includes("linux")))
    return Log({
      source: "tauri/linux.ts",
      level: LogLevel.warn,
      msg: "The answer is no, aborting.",
    });

  createOverlayableError(
    {
      title: "Important!",
      message:
        "You are running the ArcOS Desktop App on Linux. There will be inconsistencies and problems with doing this, such as poor performance and incorrect font rendering. It is recommended to run the Desktop App only on Windows until a solution to this problem has been found.",
      buttons: [{ caption: "OK", action() {} }],
    },
    getPID("ArcShell")
  );
}
