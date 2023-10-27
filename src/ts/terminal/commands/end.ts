import type { Command } from "../interface";

export const End: Command = {
  keyword: "end",
  exec(cmd, argv, term) {
    const reason = argv.join(" ").trim();

    if (reason) term.std.writeLine(reason);

    return false; // Tell code execution to stop
  },
  description: "Quit ArcTerm",
};
