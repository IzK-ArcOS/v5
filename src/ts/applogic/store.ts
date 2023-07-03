import { get, writable, Writable } from "svelte/store";
import { Log, LogLevel } from "../console";
import type { App, Process } from "./interface";

export const AppStore: Writable<{ [id: string]: App }> = writable<{
  [id: string]: App;
}>({});
export const ProcessStore: Writable<{ [pid: number]: Process }> = writable<{
  [pid: number]: Process;
}>({});
export const isFullscreenWindow: Writable<boolean> = writable<boolean>(false);
export const maxZIndex = writable<number>(1e9);
export const focusedProcessPid: Writable<number> = writable<number>(null);

export function getApp(id: string): App {
  console.log(get(AppStore));
  return get(AppStore)[id];
}

ProcessStore.subscribe((processStore) => {
  Log({
    msg: "Updating isFullscreenWindow",
    source: "store.ts: ProcessStore Subscriber",
    level: LogLevel.info,
  });

  isFullscreenWindow.set(false);
});

isFullscreenWindow.subscribe((v) => {
  console.log(v);
});

export function getWindow(pid: number): App {
  const filter = Object.entries(get(ProcessStore)).filter(
    ([p, proc]) => `${pid}` == p
  );

  if (!filter.length) return null;

  return filter[0][1].app;
}

// DUMMY FUNCTION
export function updateStores() {
  ProcessStore.set(get(ProcessStore));
  AppStore.set(get(AppStore));
}

// DUMMY FUNCTION
export function getOpenedStore() {}
