import { AppList } from "./commands/applist";
import { ArcFetch } from "./commands/arcfetch";
import { ATConf } from "./commands/atconf";
import { Cd } from "./commands/cd";
import { Clear } from "./commands/clear";
import { Colors } from "./commands/colors";
import { Dir } from "./commands/dir";
import { Echo } from "./commands/echo";
import { Vars } from "./commands/vars";
import { Exit } from "./commands/exit";
import { Help } from "./commands/help";
import { History } from "./commands/history";
import { Kill } from "./commands/kill";
import { LogDump } from "./commands/logdump";
import { Mkdir } from "./commands/mkdir";
import { oa } from "./commands/oa";
import { Open } from "./commands/open";
import { Reload } from "./commands/reload";
import { Restart } from "./commands/restart";
import { Rf } from "./commands/rf";
import { Ri } from "./commands/ri";
import { Rm } from "./commands/rm";
import { Run } from "./commands/run";
import { Set } from "./commands/set";
import { Shutdown } from "./commands/shutdown";
import { StateCommand } from "./commands/state";
import { Tauri } from "./commands/tauri";
import { UDD } from "./commands/udd";
import { Users } from "./commands/users";
import { Ver } from "./commands/ver";
import type { Command, CommandStore } from "./interface";
import { Config } from "./commands/config";
import { Read } from "./commands/read";
import { Reset } from "./commands/reset";
import { Logout } from "./commands/logout";
import { Exec } from "./commands/exec";
import { Verbose } from "./commands/verbose";

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
  Tauri,
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
];

export const desktopSpecific: CommandStore = [
  AppList,
  ATConf,
  Kill,
  oa,
  Open,
  Run,
];
