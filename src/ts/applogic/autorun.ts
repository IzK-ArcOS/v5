import { get } from "svelte/store";
import { Log } from "../console";
import { UserData } from "../userlogic/interfaces";
import { isLoaded } from "./checks";
import { openWindow } from "./events";
import { LogLevel } from "../console/interface";

export function autoRunApplications() {
  Log(
    "Starting all loaded autorun applications...",
    "autorun.ts: autoRunApplications",
    LogLevel.info
  );

  const udata = get(UserData);

  const autoRun = udata.autoRun || [];

  for (let i = 0; i < autoRun.length; i++) {
    if (isLoaded(autoRun[i])) openWindow(autoRun[i]);
    else
      Log(
        `Can't start ${autoRun[i]} at index ${i}: not loaded.`,
        "autorun.ts: autoRunApplications",
        LogLevel.warn
      );
  }
}
