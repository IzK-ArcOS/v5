import type { Command } from "../interface";

export const Reload: Command = {
  keyword: "reload",
  async exec(cmd, argv, term) {
    term.reload();
  },
  description: "Reload the ArcTerm configuration",
};
