import type { Command } from "../interface";
import { ArcTerm } from "../main";

export const Reload: Command = {
  keyword: "reload",
  exec(cmd, argv, term) {
    const target = term.target;
    const commands = term.commands;
    const app = term.app;

    term.env.prompt = "";
    term.input.lock();
    term.input.current = null;
    term.dispose();
    term = new ArcTerm(target, commands, app);
  },
  description: "Reload ArcTerm",
};
