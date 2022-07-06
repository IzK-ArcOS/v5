import { writable } from "svelte/store";
import { BugReportData } from "../bugrep";
import { Log, LogLevel } from "../console";
import { Var } from "../env/vars";
import type { State } from "./interfaces";
import { States } from "./store";

export const CurrentState = writable<State>();

export function applyState(stateKey: string) {
  if (States.has(stateKey)) {
    Log({
      level: LogLevel.info,
      source: "applyState",
      msg: `Applying state ${stateKey}`,
    });

    const state = States.get(stateKey);

    CurrentState.set(state);

    document.title = `${Var.getValue("osname")} | ${state.name}`;

    return;
  }

  Log({
    level: LogLevel.warn,
    source: "applyState",
    msg: `Can't apply a non-existent state '${stateKey}'.`,
  });

  BugReportData.set([
    true,
    {
      icon: "broken_image",
      title: `Broken page`,
      message: "ArcOS tried to open a page or location that doesn't exist.<br>This session can't continue. You can choose to restart.",
      button: {
        action: () => applyState("boot"),
        caption: "Restart",
      },
      details: `applyState: Can't apply a non-existent state '${stateKey}'.`,
    },
  ]);
}
