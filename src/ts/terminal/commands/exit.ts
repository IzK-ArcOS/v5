import { closeWindow } from "../../applogic/events";
import type { Command } from "../interface";

export const Exit: Command = {
  keyword: "exit",
  exec(cmd, argv, term) {
    closeWindow(term.app.id);
  },
  description: "Quit ArcTerm",
};
