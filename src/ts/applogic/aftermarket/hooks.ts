import { get, writable } from "svelte/store";
import { Log, LogLevel } from "../../console";
import { ErrorMessages } from "../../errorlogic/app";
import { NotificationStore } from "../../notiflogic/main";
import {
  defaultUserData,
  UserData,
  UserName,
} from "../../userlogic/interfaces";
import { loadWindow } from "../load";
import { WindowStore } from "../store";
import type { ExtendedWindow } from "./interface";
import { loadExternalApp } from "./loader";

let HOOK_UPDATE_COUNT = 0;

export function assignHooks() {
  HOOK_UPDATE_COUNT++;

  Log({
    source: "aftermarket/hooks.ts: assignHooks",
    msg: `Assigning hooks to 'window.__arcos' (count ${HOOK_UPDATE_COUNT})`,
    level: LogLevel.info,
  });

  const win = window as ExtendedWindow;

  win.__arcos = {
    loadWindow,
    loadExternalApp,
    windowStore: get(WindowStore),
    notifications: get(NotificationStore),
    errorStore: get(ErrorMessages),
    username: get(UserName) || "ArcOS",
    userData: get(UserName) ? UserData : writable(defaultUserData),
  };
}
