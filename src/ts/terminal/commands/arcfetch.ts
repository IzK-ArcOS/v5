import type { Command } from "../interface";

export const ArcFetch: Command = {
  keyword: "arcfetch",
  exec(cmd, argv, term) {
    term.util.writeLine("arcfetch brrr");
  },
  description: "Show system information",
};
