import { AppList } from "./commands/applist";
import { ArcFetch } from "./commands/arcfetch";
import { ATConf } from "./commands/atconf";
import { BugRep } from "./commands/bugrep";
import { Cd } from "./commands/cd";
import { Clear } from "./commands/clear";
import { Colors } from "./commands/colors";
import { Config } from "./commands/config";
import { Desktop } from "./commands/desktop";
import { Dir } from "./commands/dir";
import { Echo } from "./commands/echo";
import { End } from "./commands/end";
import { Err } from "./commands/err";
import { Exec } from "./commands/exec";
import { Exit } from "./commands/exit";
import { Goose } from "./commands/goose";
import { Goto } from "./commands/goto";
import { Help } from "./commands/help";
import { History } from "./commands/history";
import { If } from "./commands/if";
import { InDesktop } from "./commands/indesktop";
import { Kill } from "./commands/kill";
import { LogDump } from "./commands/logdump";
import { Logout } from "./commands/logout";
import { Ls } from "./commands/ls";
import { Mkdir } from "./commands/mkdir";
import { oa } from "./commands/oa";
import { Open } from "./commands/open";
import { Read } from "./commands/read";
import { Reload } from "./commands/reload";
import { RepInfo } from "./commands/repinfo";
import { Reset } from "./commands/reset";
import { Restart } from "./commands/restart";
import { Rf } from "./commands/rf";
import { Ri } from "./commands/ri";
import { Rm } from "./commands/rm";
import { Run } from "./commands/run";
import { Servers } from "./commands/servers";
import { Set } from "./commands/set";
import { Shutdown } from "./commands/shutdown";
import { SoundBusCommand } from "./commands/soundbus";
import { StateCommand } from "./commands/state";
import { UDD } from "./commands/udd";
import { UserAdd } from "./commands/useradd";
import { Users } from "./commands/users";
import { Vars } from "./commands/vars";
import { Ver } from "./commands/ver";
import { Verbose } from "./commands/verbose";
import type { CommandStore } from "./interface";

export const arcCommands: CommandStore = [
  ArcFetch,
  Cd,
  Clear,
  Dir,
  Echo,
  Vars,
  Exit,
  Help,
  History,
  Logout,
  Ls,
  Mkdir,
  Rm,
  Reload,
  Restart,
  Shutdown,
  InDesktop,
  Ver,
  Reset,
  Rf,
  Ri,
  Users,
  Read,
  Set,
  SoundBusCommand,
  Config,
  Exec,
  Verbose,
  Desktop,
  Servers,
  If,
  Goto,
  End,
  Goose,
  UserAdd,
];

/**
 * For security purposes, this Array will be obscured & undocumented.
 *
 * The ArcOS Team can reference internal Object Documentation UUID #b9a48ed8-5171-4ecb-ba5f-8601fd8b4243 for
 * more information about this chunk of the ArcTerm implementation. Any questions asked by externals cannot and will
 * not be answered.
 *
 * The Team can use Reference f1543394846c when asking the Board about this code.
 */
export const gooseBumpsCommands: CommandStore = [
  StateCommand,
  Colors,
  UDD,
  LogDump,
  BugRep,
  RepInfo,
  Err,
];

export const desktopSpecific: CommandStore = [
  AppList,
  ATConf,
  Kill,
  oa,
  Open,
  Run,
];
