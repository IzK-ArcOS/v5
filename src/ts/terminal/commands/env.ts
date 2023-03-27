import type { Command } from "../interface";

export const Env: Command = {
  keyword: "env",
  async exec(cmd, argv, term) {
    const e = Object.entries(term.env.config.getConfig());
    const v = Object.entries(await term.vars.getAll());

    for (let i = 0; i < e.length; i++) {
      const str = e[i][1].toString();
      const key = e[i][0].padEnd(20, " ");

      term.util.writeColor(`# [${key}]: `, "blue", "white", true);
      term.util.write(`${str}`);
      term.util.writeLine("");
    }

    for (let i = 0; i < v.length; i++) {
      const str = v[i][1].value;
      const key = v[i][0].padEnd(20, " ");

      const prefix = v[i][1].readOnly ? "#" : " ";

      term.util.writeColor(`${prefix} [${key}]: `, "aqua", "white", true);
      term.util.write(`${str}`);
      term.util.writeLine("");
    }
  },
  description: "List the environment and variables",
};
