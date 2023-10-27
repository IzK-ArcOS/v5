import { get } from "svelte/store";
import { applyState, CurrentState } from "../../state/main";
import type { Command } from "../interface";

export const StateCommand: Command = {
  keyword: "state",
  exec(cmd, argv, term) {
    const state = argv.join(" ");

    if (!state) {
      const s = CurrentState;

      return term.std.writeColor(
        `Current state: [${s.name}] (ArcOS.state.[${s.key}])`,
        "purple"
      );
    }

    applyState(state, false);
  },
  syntax: "<[stateId]>",
  description: "for debugging -- forcefully change the state",
  hidden: true,
};
