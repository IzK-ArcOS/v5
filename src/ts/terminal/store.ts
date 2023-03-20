import { AppList } from "./commands/applist";
import { ATConf } from "./commands/atconf";
import { Cd } from "./commands/cd";
import { Clear } from "./commands/clear";
import { Colors } from "./commands/colors";
import { Dir } from "./commands/dir";
import { Echo } from "./commands/echo";
import { Env } from "./commands/env";
import { Exit } from "./commands/exit";
import { Help } from "./commands/help";
import { Kill } from "./commands/kill";
import { Mkdir } from "./commands/mkdir";
import { Open } from "./commands/open";
import { Reload } from "./commands/reload";
import { Rm } from "./commands/rm";
import { Run } from "./commands/run";
import type { Command, CommandStore } from "./interface";

export const defaultCommand: Command = {
  keyword: "default",
  exec: (cmd, _, term) => {
    if (cmd) term.util.Error(`${cmd}: command not found.`);
  },
  description: "Default command",
};

export const arcCommands: CommandStore = [
  AppList,
  ATConf,
  Cd,
  Clear,
  Colors,
  Dir,
  Echo,
  Env,
  Exit,
  Help,
  Kill,
  Mkdir,
  Open,
  Rm,
  Reload,
  Run,
];
