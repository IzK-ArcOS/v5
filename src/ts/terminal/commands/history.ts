import type { Command } from "../interface";
import type { ArcTerm } from "../main";

export const History: Command = {
  keyword: "history",
  exec(cmd, argv, term) {
    if (argv.includes("clear")) return clear(term);

    const hist = term.commandHandler.history;

    for (let i = 0; i < hist.length; i++) {
      const index = `${i}`.padStart(3, "0");

      term.std.writeColor(`[${index}]: ${hist[i]}`, "yellow");
    }
  },
  description: "Show the command history",
  syntax: "([clear?])",
};

function clear(term: ArcTerm) {
  const len = term.commandHandler.history.length;

  term.commandHandler.history = [];

  term.std.writeColor(
    `[SUCCESS]: History cleared, ${len} items removed.`,
    "green"
  );
}
