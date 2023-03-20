import { AppList } from "./commands/applist";
import { ATConf } from "./commands/atconf";
import { Cd } from "./commands/cd";
import { Clear } from "./commands/clear";
import { Dir } from "./commands/dir";
import { Help } from "./commands/help";
import { Mkdir } from "./commands/mkdir";
import { Open } from "./commands/open";
import { Reload } from "./commands/reload";
import { Rm } from "./commands/rm";
import { Run } from "./commands/run";
import type { Command, CommandStore } from "./interface";

export const defaultCommand: Command = {
  keyword: "default",
  exec: (cmd, _, term) => {
    if (cmd) term.util.writeColor(`[Error]: ${cmd}: command not found.`, "red");
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
  Mkdir,
  Rm,
  Reload,
  ATConf,
];
