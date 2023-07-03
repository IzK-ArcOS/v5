import { closeProcess } from "../../applogic/events";
import type { Command } from "../interface";

export const Exit: Command = {
  keyword: "exit",
  exec(cmd, argv, term) {
    if (!term.process)
      return term.std.Error(
        "can't close ArcTerm: no associated app in constructor"
      );

    closeProcess(term.process.id);
  },
  description: "Quit ArcTerm",
};
