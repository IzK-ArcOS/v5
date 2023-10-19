import { get, writable } from "svelte/store";
import { logoffToken } from "../api/cred";
import { InvalidStateBugrep } from "../bugrep";
import { Log } from "../console";
import type { State } from "./interfaces";
import { States } from "./store";
import { LogLevel } from "../console/interface";
import { UserCache } from "../userlogic/cache";
import { UserToken } from "../userlogic/interfaces";
import { stateChangeTrigger } from "./watch";

export let CurrentState: State = States[0];

export function applyState(stateKey: string, discontinue = true) {
  if (States.has(stateKey)) {
    Log(
      "state/main.ts: applyState",
      `Applying state ${stateKey}`,
      LogLevel.info
    );

    const state = States.get(stateKey);

    if (state.onload) state.onload();

    CurrentState = state;
    UserCache.clear();

    const t = `ArcOS | ${state.name}`;

    document.title = t;

    stateChangeTrigger(CurrentState);

    if (stateKey != "desktop" && discontinue && get(UserToken)) logoffToken();

    return;
  }

  InvalidStateBugrep("ArcOS State Switcher", stateKey);
}
