import { applyState } from "../../state/main";
import { States } from "../../state/store";
import type { Command } from "../interface";

export const StateCommand: Command = {
  keyword: "state",
  exec(cmd, argv, term) {
    const state = argv.join(" ");

    if (!States.get(state))
      return term.util.Error(`${state}: State doesn't exist.`);

    applyState(state);
  },
  syntax: "<[stateId]>",
  description: "for debugging -- forcefully change the state",
};
