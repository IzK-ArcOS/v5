import { get } from "svelte/store";
import { applyState, CurrentState } from "../../state/main";
import { States } from "../../state/store";
import type { Command } from "../interface";

export const StateCommand: Command = {
  keyword: "state",
  exec(cmd, argv, term) {
    const state = argv.join(" ");

    if (!state) {
      const s = get(CurrentState);

      return term.std.writeColor(
        `Current state: [${s.name}] (ArcOS.state.[${s.key}])`,
        "purple"
      );
    }

    if (!States.get(state))
      return term.std.Error(`${state}: State doesn't exist.`);

    applyState(state);
  },
  syntax: "<[stateId]>",
  description: "for debugging -- forcefully change the state",
};
