import type { Command } from "../interface";

export const Echo: Command = {
  keyword: "echo",
  exec(cmd, argv, term) {
    const Regx = argv.join(" ").match(/"(.*?)"/);

    if (Regx && Regx.length > 1) {
      const text = Regx[1];

      term.util.writeLine(text);
    } else {
      term.util.Error("Unable to echo: syntax invalid!");
    }
  },
  description: "Echo a string.",
};
