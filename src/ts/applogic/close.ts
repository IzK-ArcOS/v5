import { get } from "svelte/store";
import { WindowStore } from "./store";
import { closeWindow } from "./events";
import sleep from "../sleep";
import { Log } from "../console";
import { isOpened } from "./checks";

export async function closeAllProgressively() {
  Log("applogic/close.ts: closeAllProgressively", `Closing entire WindowStore`);
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    const opened = isOpened(ws[i].id);

    closeWindow(ws[i].id);

    await sleep(opened ? 50 : 0);
  }
}
