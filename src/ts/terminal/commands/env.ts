import type { Command } from "../interface";

export const Env: Command = {
  keyword: "env",
  exec(cmd, argv, term) {
    const e = Object.entries(term.env.config.getConfig());

    for (let i = 0; i < e.length; i++) {
      const str = e[i][1].toString();
      const key = e[i][0].padEnd(20, " ");

      term.util.writeColor(`[${key}]: `, "blue", "white", true);
      term.util.write(`${str}`);
      term.util.writeLine("");
    }
  },
  description: "List the environment variables",
};
