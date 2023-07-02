import { get } from "svelte/store";
import { WindowStore } from "./store";
import { closeWindow } from "./events";
import sleep from "../sleep";

export async function closeAllProgressively() {
  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    closeWindow(ws[i].id);

    await sleep(50);
  }
}
