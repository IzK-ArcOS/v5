import { writable } from "svelte/store";
import { InvalidStateBugrep } from "../bugrep";
import { Log } from "../console";
import type { State } from "../state/interfaces";
import { FTSStates } from "./store";

export const CurrentFTSState = writable<State>();

export function applyFTSState(stateKey: string) {
  if (FTSStates.has(stateKey)) {
    Log("applyFTSState", `Applying state ${stateKey}`);

    const state = FTSStates.get(stateKey);

    CurrentFTSState.set(state);

    return;
  }

  InvalidStateBugrep("FirstTimeSetup", stateKey);
}
