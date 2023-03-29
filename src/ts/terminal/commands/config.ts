import type { Command } from "../interface";

export const Config: Command = {
  keyword: "config",
  exec(cmd, argv, term) {
    const e = Object.entries(term.env.config.getConfig());

    for (let i = 0; i < e.length; i++) {
      const str = e[i][1].toString();
      const key = e[i][0].padEnd(20, " ");

      term.std.writeColor(`# [${key}]: `, "blue", "white", true);
      term.std.write(`${str}`);
      term.std.writeLine("");
    }
  },
  description: "List configuration options",
};
