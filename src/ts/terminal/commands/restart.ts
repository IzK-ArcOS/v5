import { get } from "svelte/store";
import { restart } from "../../desktop/power";
import { CurrentState } from "../../state/main";
import type { Command } from "../interface";

export const Restart: Command = {
  keyword: "restart",
  exec(cmd, argv, term) {
    if (get(CurrentState).key == "desktop") return restart(false);

    term.std.writeColor("[RESTART]: Terminating NOW.", "green");

    setTimeout(() => {
      location.reload();
    }, 1000);
  },

  description: "Restart ArcOS",
};
