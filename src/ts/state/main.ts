import { appWindow } from "@tauri-apps/api/window";
import { writable } from "svelte/store";
import { logoffToken } from "../api/cred";
import { InvalidStateBugrep } from "../bugrep";
import { Log } from "../console";
import type { State } from "./interfaces";
import { States } from "./store";
import { LogLevel } from "../console/interface";
import { setWindowTitle } from "../tauri";

export const CurrentState = writable<State>(States[0]);

export function applyState(stateKey: string) {
  if (States.has(stateKey)) {
    Log({
      level: LogLevel.info,
      source: "state/main.ts: applyState",
      msg: `Applying state ${stateKey}`,
    });

    const state = States.get(stateKey);

    if (state.onload) state.onload();

    CurrentState.set(state);

    const t = `ArcOS | ${state.name}`;

    document.title = t;
    try {
      setWindowTitle(state.name);
    } catch {
      /** failing quietly */
    }

    if (stateKey != "desktop") logoffToken();

    return;
  }

  InvalidStateBugrep("ArcOS State Switcher", stateKey);
}
