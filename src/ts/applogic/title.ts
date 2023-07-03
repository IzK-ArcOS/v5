import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import { AppStore, ProcessStore } from "./store";

export function setTitleSuffix(content: string, pid: number) {
  Log({
    msg: `Setting title suffix of ${pid}`,
    source: "title.ts: setTitleSuffix",
    level: LogLevel.info,
  });

  const processStore = get(ProcessStore);

  if (!Originals[pid]) Originals[pid] = `${processStore[pid].app.info.titleSuffix}`;

  processStore[pid].app.info.titleSuffix = content;

  ProcessStore.set(processStore);
}

export function resetTitleSuffix(appId: string) {
  Log({
    msg: `Resetting title suffix of ${appId}`,
    source: "title.ts: resetTitleSuffix",
    level: LogLevel.info,
  });

  if (!Originals[appId]) return;

  const appStore = get(AppStore);

  appStore[appId].info.titleSuffix = Originals[appId];

  delete Originals[appId];

  AppStore.set(appStore);
}

const Originals: { [key: string]: string } = {};
