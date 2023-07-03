import { get } from "svelte/store";
import type { OverlayableError } from "../applogic/interface";
import { AppStore, ProcessStore } from "../applogic/store";
import { Log, LogLevel } from "../console";

export function createOverlayableError(error: OverlayableError, targetPid: number): boolean {
  Log({
    source: "errorlogic/overlay.ts",
    msg: `Creating error "${error.title}" for parent ${targetPid}`,
    level: LogLevel.info,
  });
  const processStore = get(ProcessStore);

  for (const strI in processStore) {
    const i = parseInt(strI);
    const process = processStore[i];

    if (process.id != targetPid) continue;

    if (!process.errorProcessOverlays) process.errorProcessOverlays = [];

    const overlayErrorId: number = Math.floor(Math.random() * 1e9);
    process.errorProcessOverlays[overlayErrorId] = {
      ...error,
      id: overlayErrorId,
    };

    ProcessStore.set(processStore);

    return true;
  }

  return false;
}

export function destroyOverlayableError(errorId: number, ownerPid: number): boolean {
  const processStore = get(ProcessStore);

  if (!processStore[ownerPid].errorProcessOverlays[errorId]) return false;

  delete processStore[ownerPid].errorProcessOverlays[errorId];

  ProcessStore.set(processStore);

  return true;
}
