import type { Command } from "../interface";

export const Set: Command = {
  keyword: "set",
  async exec(cmd, argv, term) {
    const key = argv[0];
    const Regx = argv.join(" ").match(/"(.*?)"/);

    if (Regx.length < 2) return term.util.Error("Missing value");

    const value = Regx[1];

    const setter = await term.vars.set(key, value);

    if (!setter) term.util.Error("Variable is read-only!");
  },
  description: "Set a variable",
  syntax: `<[key]> "<[value]>"`,
};
