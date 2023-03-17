import type { Command } from "../interface";

export const Help: Command = {
  keyword: "help",
  exec(cmd, argv, term) {
    term.util.writeLine("\nThese are the built-in commands:\n");

    for (let i = 0; i < term.commands.length; i++) {
      const a = term.commands[i].keyword.toUpperCase().padEnd(15, " ");
      const b = term.commands[i].description;

      term.util.writeLine(`${a}${b}`);
    }
  },
  description: "The help menu",
};
