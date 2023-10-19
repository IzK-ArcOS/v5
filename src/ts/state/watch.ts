import { Log } from "../console";
import type { State } from "./interfaces";
import { CurrentState } from "./main";

const WATCHERS: ((state: State) => any)[] = [];

export function onStateChange(event: (state: State) => any) {
  Log("state/watch.ts: onStateChange", `Adding watcher: ${event.toString()}`);
  WATCHERS.push(event);

  event(CurrentState);
}

export async function stateChangeTrigger(state: State) {
  for (let i = 0; i < WATCHERS.length; i++) {
    Log(
      "state/watch.ts: stateChangeTrigger",
      `Triggering watcher at index ${i}: state changing to ${state.key}`
    );
    await WATCHERS[i](state);
  }
}
