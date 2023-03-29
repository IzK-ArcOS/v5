import type { Command } from "../interface";

export const Vars: Command = {
  keyword: "vars",
  async exec(cmd, argv, term) {
    const v = Object.entries(await term.vars.getAll());

    for (let i = 0; i < v.length; i++) {
      if (!v[i][1].value) continue;

      const str = v[i][1].value;
      const key = v[i][0].padEnd(20, " ");

      const prefix = v[i][1].readOnly ? "#" : " ";

      term.std.writeColor(`${prefix} [${key}]: `, "aqua", "white", true);
      term.std.write(`${str}`);
      term.std.writeLine("");
    }
  },
  description: "List the variables",
};
