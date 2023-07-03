import { get } from "svelte/store";
import { ProcessStore, getWindow } from "../applogic/store";

export function showOverlay(id: string, parentPid: number): boolean {
  const window = getWindow(parentPid);

  if (!window || !window.overlayApps || !window.overlayApps[id]) return false;

  const procStore = get(ProcessStore);

  procStore[parentPid].overlayProcesses[id] = {
    id,
    parentPid,
    overlayableApp: window.overlayApps[id],
    show: true,
  };

  ProcessStore.set(procStore);
}

export function hideOverlay(id: string, parentPid: number): boolean {
  const procStore = get(ProcessStore);

  if (!procStore[parentPid] || !procStore[parentPid].overlayProcesses[id])
    return false;

  delete procStore[parentPid].overlayProcesses[id];

  ProcessStore.set(procStore);

  return true;
}
