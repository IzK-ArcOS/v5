import { AppList } from "./commands/applist";
import { Cd } from "./commands/cd";
import { Clear } from "./commands/clear";
import { Dir } from "./commands/dir";
import { Help } from "./commands/help";
import { Open } from "./commands/open";
import { Run } from "./commands/run";
import type { Command, CommandStore } from "./interface";

export const defaultCommand: Command = {
  keyword: "default",
  exec: (cmd, _, term) => {
    if (cmd) term.util.writeLine(`Unknown command "${cmd}"`);
  },
  description: "Default command",
};

export const arcCommands: CommandStore = [
  Help,
  Clear,
  Open,
  AppList,
  Dir,
  Cd,
  Run,
];
