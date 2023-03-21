import { ArcTermEnv } from "../env";
import type { Command } from "../interface";
import { ArcTerm } from "../main";

export const Reload: Command = {
  keyword: "reload",
  async exec(cmd, argv, term) {
    term.dispose(); // Dispose the current instance, locking ArcTerm

    // Re-initialize ArcTerm with the exact same initial parameters
    // after the next frame has advanced
    setTimeout(async () => {
      await term.initialize();
    });
  },
  description: "Reload the ArcTerm configuration",
};
