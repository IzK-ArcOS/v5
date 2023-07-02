import { get } from "svelte/store";
import { Log } from "../console";
import { UserData } from "../userlogic/interfaces";
import { isLoaded } from "./checks";
import { openWindow } from "./events";
import { LogLevel } from "../console/interface";

export function autoRunApplications() {
  Log({
    msg: "Starting all loaded autorun applications...",
    source: "autorun.ts: autoRunApplications",
    level: LogLevel.info,
  });

  const udata = get(UserData);

  const autoRun = udata.autoRun || [];

  for (let i = 0; i < autoRun.length; i++) {
    if (isLoaded(autoRun[i])) openWindow(autoRun[i]);
    else
      Log({
        msg: `Can't start ${autoRun[i]} at index ${i}: not loaded.`,
        source: "autorun.ts: autoRunApplications",
        level: LogLevel.warn,
      });
  }
}
