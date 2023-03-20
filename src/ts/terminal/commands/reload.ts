import { ArcTermEnv } from "../env";
import type { Command } from "../interface";
import { ArcTerm } from "../main";

export const Reload: Command = {
  keyword: "reload",
  async exec(cmd, argv, term) {
    term.dispose();

    setTimeout(async () => {
      await term.initialize();
    });
  },
  description: "Reload the ArcTerm configuration",
};
