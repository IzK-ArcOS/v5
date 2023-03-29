import { closeWindow } from "../../applogic/events";
import type { Command } from "../interface";

export const Exit: Command = {
  keyword: "exit",
  exec(cmd, argv, term) {
    if (!term.app)
      return term.std.Error(
        "can't close ArcTerm: no associated app in constructor"
      );

    closeWindow(term.app.id);
  },
  description: "Quit ArcTerm",
};
