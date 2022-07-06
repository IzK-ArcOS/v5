import { writable } from "svelte/store";
import { Log, LogLevel } from "../console";
import type { State } from "../state/interfaces";
import { LoginStates } from "./store";

export const CurrentLoginState = writable<State>();
export const loginUsername = writable<string>();

export function applyLoginState(stateKey: string) {
  if (LoginStates.has(stateKey)) {
    Log({
      level: LogLevel.info,
      source: "applyLoginState",
      msg: `Applying state ${stateKey}`,
    });

    const state = LoginStates.get(stateKey);

    CurrentLoginState.set(state);

    return;
  }

  Log({
    level: LogLevel.warn,
    source: "applyLoginState",
    msg: "Can't apply a non-existent state.",
  });
}
