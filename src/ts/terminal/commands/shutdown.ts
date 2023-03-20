import { shutdown } from "../../desktop/power";
import type { Command } from "../interface";

export const Shutdown: Command = {
  keyword: "shutdown",
  exec(cmd, argv, term) {
    shutdown();
  },

  description: "Turn off ArcOS",
};
