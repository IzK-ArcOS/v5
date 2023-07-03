import type { Writable } from "svelte/store";
import { Log, LogLevel } from "../../../console";
import { ErrorMessages } from "../../../errorlogic/app";
import { NotificationStore } from "../../../notiflogic/main";
import { UserData } from "../../../userlogic/interfaces";
import { AppStore } from "../../store";
import { assignHooks } from "../hooks";

export const hookUpdatable: Writable<any>[] = [
  AppStore,
  NotificationStore,
  ErrorMessages,
  UserData,
];

export function assignHookUpdateListeners() {
  Log({
    source: "aftermarket/hooks/updaters.ts: assignHookUpdateListeners",
    msg: `Assigning updaters for ${hookUpdatable.length} writables.`,
    level: LogLevel.warn,
  });

  for (let i = 0; i < hookUpdatable.length; i++) {
    if (!hookUpdatable[i]) continue;

    hookUpdatable[i].subscribe(assignHooks);
  }
}
