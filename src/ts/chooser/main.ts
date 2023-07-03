import { get } from "svelte/store";
import { ProcessStore } from "../applogic/store";
import { generateChooserOverlayProcess } from "./data";
import { assignTarget } from "./store";
import { makeNotification } from "../notiflogic/main";

export function showOpenFileDialog(targetPid: number) {
  makeNotification({
    title: "Not possible",
    message:
      "Due to PID conversion the ChooserOverlay (open file dialog) has been disabled due to incompatibilities. This is not a bug, but rather a temporary required block.",
    buttons: [],
    timeout: 3000,
  });
  return;

  const processStore = get(ProcessStore);

  const overlay = generateChooserOverlayProcess();

  assignTarget(overlay.id, targetPid);

  if (processStore[targetPid] && !processStore[targetPid].overlayProcesses)
    processStore[targetPid].overlayProcesses = {};

  processStore[targetPid].overlayProcesses[overlay.id] = overlay;

  ProcessStore.set(processStore);
}
