import type { Command } from "../interface";

export const Echo: Command = {
  keyword: "echo",
  exec(cmd, argv, term) {
    const Regx = argv.join(" ").match(/"(.*?)"/);

    if (Regx && Regx.length > 1) {
      const text = term.vars.replace(Regx[1]);

      term.std.writeLine(text);

      return;
    }

    term.std.Error("Unable to echo: syntax invalid!");
  },
  help(term){
    term.std.writeColor("Example: [echo] I <3 ArcOS!", "blue");
  },
  description: "Echo a string.",
  syntax: `"<[string]>"`,
};
