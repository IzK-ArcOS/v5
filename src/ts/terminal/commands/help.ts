import { switchExists } from "../argv";
import type { Command } from "../interface";
import type { ArcTerm } from "../main";
import { Default } from "./default";

export const Help: Command = {
  keyword: "help",
  exec(cmd, argv, term) {
    if (switchExists(argv, "count"))
      return term.std.writeColor(
        `ArcTerm has [${term.commands.length}] commands.`,
        "aqua"
      );

    if (argv[0] && !argv[0].startsWith("--")) return specific(argv[0], term);

    all(term, !switchExists(argv, "list"));
  },
  help(term) {
    term.std.writeColor("Example: [help] help", "blue");
  },
  description: "Display a list of built-in commands",
  syntax: "([command?])",
};

function all(term: ArcTerm, short: boolean) {
  const cmd = term.commands.sort((a, b) => {
    return b.keyword < a.keyword ? 1 : -1;
  });
  if (short)
    return term.std.writeColor(
      `[${cmd.map((c) => c.keyword).join("  ")}]`,
      "aqua"
    );

  for (let i = 0; i < cmd.length; i++) {
    const a = cmd[i].keyword.toUpperCase().padEnd(15, " ");
    const b = cmd[i].description;

    term.std.writeColor(`[${a}]${b}`, cmd[i].hidden ? "purple" : "orange");
  }
}

function specific(command: string, term: ArcTerm) {
  const c = term.commandHandler.getCommand(command);

  if (!c || c.keyword == Default.keyword)
    return term.std.Error(`${command}: command not found.`);

  if (!c.help) {
    term.std.writeColor(
      `[${c.keyword.toUpperCase()}]: ${c.description}`,
      "blue"
    );

    term.std.writeLine("\n");
  }

  term.std.writeColor(`Usage: [${c.keyword}] ${c.syntax || ""}`, "blue");
  term.std.writeLine("\n");

  if (c.help) return c.help(term);
}
