import { get } from "svelte/store";
import type { App, Process } from "../../applogic/interface";
import { ProcessStore, AppStore } from "../../applogic/store";
import { switchExists } from "../argv";
import type { Command } from "../interface";
import type { ArcTerm } from "../main";

export const AppList: Command = {
  keyword: "applist",
  exec(cmd, argv, term) {
    const listProcesses = switchExists(argv, "open")

    header(term, listProcesses);

    const store = Object.entries(listProcesses ? get(ProcessStore) : get(AppStore));
    for (let i = 0; i < store.length; i++) {
      printExecutableUnit(term, store[i][1])
    }
  },
  description: "List all- or opened ArcOS apps.",
  syntax: "([opened?])",
};

function printExecutableUnit(term: ArcTerm, executableUnit: App | Process) {
  const app = (<Process>executableUnit).app ? (<Process>executableUnit).app : executableUnit as App;

  const padding = (<Process>executableUnit).app ? 20 : 30

  const id = app.id.padEnd(padding, " ");
  const name = app.info.name.padEnd(padding, " ");
  const version = app.info.version;

  if ((<Process>executableUnit).app) {
    const pid = (<Process>executableUnit).id.toString().padEnd(padding, " ");

    term.std.writeColor(`${name}[${id}][${pid}]${version}`, "gray");
  } else {
    term.std.writeColor(`${name}[${id}]${version}`, "gray");
  }
}

function header(term: ArcTerm, includePid: boolean) {
  const padding = includePid ? 20 : 30

  const hName = `Name`.padEnd(padding, " ");
  const hId = `ID`.padEnd(padding, " ");
  const hPid = `PID`.padEnd(padding, " ")
  const hVer = `Version`;

  const head = includePid 
    ? `${hName}${hId}${hPid}${hVer}`
    : `${hName}${hId}${hVer}`;

  term.std.writeColor(`[${head}]`, "yellow");
  term.std.writeSeperator(head.length);
}
