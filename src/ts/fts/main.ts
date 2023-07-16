import { writable } from "svelte/store";
import { InvalidStateBugrep } from "../bugrep";
import { Log } from "../console";
import { LogLevel } from "../console/interface";
import type { State } from "../state/interfaces";
import { FTSStates } from "./store";
import { ArcSoundBus } from "../sound/main";

export const CurrentFTSState = writable<State>();

export function applyFTSState(stateKey: string) {
  if (FTSStates.has(stateKey)) {
    Log("applyFTSState", `Applying state ${stateKey}`, LogLevel.info);

    const state = FTSStates.get(stateKey);

    CurrentFTSState.set(state);

    ArcSoundBus.playSound("arcos.click");

    return;
  }

  InvalidStateBugrep("FirstTimeSetup", stateKey);
}
