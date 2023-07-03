import { get } from "svelte/store";
import { previouslyLoaded } from "../../desktop/main";
import { applyState } from "../../state/main";
import type { Command } from "../interface";
import { getSwitches } from "../argv";

export const Desktop: Command = {
  keyword: "desktop",
  exec(cmd, argv, term) {
    if (term.process)
      return term.std.Error("You already are in the ArcOS desktop!");

    if (get(previouslyLoaded) && !getSwitches(argv)["force"])
      return term.std.Error(
        "The desktop may not be initialized twice in one instance. Please use [RESTART]."
      );

    applyState("desktop");
  },
  description: "Switch to Desktop",
};
