import type { Command } from "../interface";
import type { ArcTerm } from "../main";
import { defaultCommand } from "../store";

export const Help: Command = {
  keyword: "help",
  exec(cmd, argv, term) {
    if (argv[0]) return specific(argv[0], term);

    all(term);
  },
  description: "Display a list of built-in commands",
  syntax: "([command?])",
};

function all(term: ArcTerm) {
  for (let i = 0; i < term.commands.length; i++) {
    const a = term.commands[i].keyword.toUpperCase().padEnd(15, " ");
    const b = term.commands[i].description;

    term.util.writeColor(`[${a}]${b}`, "orange");
  }
}

function specific(command: string, term: ArcTerm) {
  const c = term.commandHandler.getCommand(command);

  if (!c || c.keyword == defaultCommand.keyword)
    return term.util.Error(`${command}: command not found.`);

  term.util.writeColor(
    `[${c.keyword.toUpperCase()}]: ${c.description}`,
    "blue"
  );

  term.util.writeLine("\n");

  term.util.writeColor(`Usage: [${c.keyword}] ${c.syntax || ""}`, "blue");
}
