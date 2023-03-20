import { restart } from "../../desktop/power";
import type { Command } from "../interface";

export const Restart: Command = {
  keyword: "restart",
  exec(cmd, argv, term) {
    restart();
  },

  description: "Restart ArcOS",
};
