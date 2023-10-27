import { logoffToken } from "../api/cred";
import { closeAllProgressively } from "../applogic/close";
import sleep from "../sleep";
import { applyState } from "../state/main";
import { showDesktop } from "./main";

export async function shutdown() {
  await closeAllProgressively();

  showDesktop.set(false);

  await sleep(300);

  logoffToken();

  applyState("shutdown");
}

export async function restart(eraseToken = false) {
  await closeAllProgressively();

  showDesktop.set(false);

  await sleep(300);

  if (eraseToken) {
    localStorage.removeItem("arcos-remembered-token");
    logoffToken();
  }

  applyState(eraseToken ? "logoff" : "restart");
}
