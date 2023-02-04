import { get } from "svelte/store";
import { WindowStore } from "../applogic/store";
import { generateChooserOverlayData } from "./data";
import { assignTarget } from "./store";

export function showOpenFileDialog(targetId: string) {
  const ws = get(WindowStore);

  let index = null;

  for (let i = 0; i < ws.length; i++) {
    if (ws[i].id == targetId) {
      index = i;
      break;
    }
  }

  if (index == null) return false;

  const overlay = generateChooserOverlayData();

  assignTarget(overlay.id, targetId);

  if (!ws[index].overlays) ws[index].overlays = {};

  ws[index].overlays[overlay.id] = overlay;

  WindowStore.set(ws);
}
