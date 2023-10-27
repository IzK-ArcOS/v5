import { get } from "svelte/store";
import { shutdown } from "../../desktop/power";
import { applyState, CurrentState } from "../../state/main";
import type { Command } from "../interface";

export const Shutdown: Command = {
  keyword: "shutdown",
  exec(cmd, argv, term) {
    if (CurrentState.key == "desktop") return shutdown();

    term.std.writeColor("[SHUTDOWN]: Terminating NOW.", "green");

    setTimeout(() => {
      applyState("turnedoff");
    }, 1000);
  },

  description: "Turn off ArcOS",
};
