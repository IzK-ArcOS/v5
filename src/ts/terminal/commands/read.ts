import type { Command } from "../interface";

export const Read: Command = {
  keyword: "read",
  async exec(cmd, argv, term) {
    const key = argv[0];
    const value = await term.std.read(`${key}: [`, `]`, 30);

    const setter = term.vars.set(key, value);

    if (!setter) term.std.Error("Unable to set variable: it is read-only!");
  },
  description: "Read user input to a variable",
  syntax: "<[variable]>",
};
