import { AppList } from "./commands/applist";
import { ArcFetch } from "./commands/arcfetch";
import { ATConf } from "./commands/atconf";
import { Cd } from "./commands/cd";
import { Clear } from "./commands/clear";
import { Colors } from "./commands/colors";
import { Config } from "./commands/config";
import { Desktop } from "./commands/desktop";
import { Dir } from "./commands/dir";
import { Echo } from "./commands/echo";
import { Exec } from "./commands/exec";
import { Exit } from "./commands/exit";
import { Help } from "./commands/help";
import { History } from "./commands/history";
import { Kill } from "./commands/kill";
import { LogDump } from "./commands/logdump";
import { Logout } from "./commands/logout";
import { Mkdir } from "./commands/mkdir";
import { oa } from "./commands/oa";
import { Open } from "./commands/open";
import { Read } from "./commands/read";
import { Reload } from "./commands/reload";
import { Reset } from "./commands/reset";
import { Restart } from "./commands/restart";
import { Rf } from "./commands/rf";
import { Ri } from "./commands/ri";
import { Rm } from "./commands/rm";
import { Run } from "./commands/run";
import { Set } from "./commands/set";
import { Shutdown } from "./commands/shutdown";
import { UDD } from "./commands/udd";
import { Users } from "./commands/users";
import { Vars } from "./commands/vars";
import { Ver } from "./commands/ver";
import { Verbose } from "./commands/verbose";
import type { Command, CommandStore } from "./interface";

export const defaultCommand: Command = {
  keyword: "default",
  exec: (cmd, _, term) => {
    if (cmd) term.std.Error(`${cmd}: command not found.`);
  },
  description: "Default command",
};

export const arcCommands: CommandStore = [
  ArcFetch,
  Cd,
  Clear,
  Colors,
  Dir,
  Echo,
  Vars,
  Exit,
  Help,
  History,
  LogDump,
  Logout,
  Mkdir,
  Rm,
  Reload,
  Restart,
  Shutdown /* 
  StateCommand, */,
  UDD,
  Ver,
  Reset,
  Rf,
  Ri,
  Users,
  Read,
  Set,
  Config,
  Exec,
  Verbose,
  Desktop,
];

export const desktopSpecific: CommandStore = [
  AppList,
  ATConf,
  Kill,
  oa,
  Open,
  Run,
];
