import { switchExists } from "../argv";
import type { Command } from "../interface";

export const Verbose: Command = {
  keyword: "verbose",
  exec(cmd, argv, term) {
    const off = switchExists(argv, "off");
    const on = switchExists(argv, "on");

    if (off && on) return term.std.Error("Can't accept both --on and --off.");

    if (!off && !on) return term.std.Error("Missing --on or --off.");

    if (on) term.std.verbose = true;
    if (off) term.std.verbose = false;
  },
  description: "Set verbose mode on or off.",
  syntax: "--[on]? --[off]?",
};
