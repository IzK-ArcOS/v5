import { WindowStore } from "../../applogic/store";
import { Log } from "../../console";
import { LogLevel } from "../../console/interface";

export function getParentDirectory(p: string) {
  Log(
    "fs/main.ts: getParentDirectory",
    `Getting parent of ${p}`,
    LogLevel.info
  );

  const split = p.split("/");

  if (p == "./") return p;
  if (!split.length) return p;
  if (split.length == 1) return "./";

  split.splice(-1);

  const newPath = split.join("/");

  return newPath;
}

export function closeFile(id: string) {
  Log("fs/main.ts: closeFile", `Closing file of ${id}`);

  WindowStore.update((ws) => {
    for (let i = 0; i < ws.length; i++) {
      if (ws[i].id == id) {
        ws[i].openedFile = null;
      }
    }
    return ws;
  });
}
