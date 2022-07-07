import { writable } from "svelte/store";
import { InvalidStateBugrep } from "../bugrep";
import { Log, LogLevel } from "../console";
import type { State } from "../state/interfaces";
import { FTSStates } from "./store";

export const CurrentFTSState = writable<State>();
export const loginUsername = writable<string>();

export function applyFTSState(stateKey: string) {
  if (FTSStates.has(stateKey)) {
    Log({
      level: LogLevel.info,
      source: "applyFTSState",
      msg: `Applying state ${stateKey}`,
    });

    const state = FTSStates.get(stateKey);

    CurrentFTSState.set(state);

    return;
  }

  InvalidStateBugrep("FirstTimeSetup",stateKey);
}
