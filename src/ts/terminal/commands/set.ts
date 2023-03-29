import type { Command } from "../interface";

export const Set: Command = {
  keyword: "set",
  async exec(cmd, argv, term) {
    const key = argv[0];
    const Regx = argv.join(" ").match(/"(.*?)"/);

    if (!Regx || Regx.length < 2) {
      const deleter = await term.vars.delete(key);

      if (!deleter)
        term.std.Error(
          "Can't delete variable: deletion isn't allowed or the variable is read-only."
        );

      return;
    }

    const value = Regx[1];

    const setter = await term.vars.set(key, value);

    if (!setter)
      term.std.Error("Can't update variable: the variable is readonly.");
  },
  description: "Set a variable",
  syntax: `<[key]> "<[value]>"`,
};
