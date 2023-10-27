import { WindowStore } from "../applogic/store";
import { generateChooserOverlayData } from "./data";
import { assignTarget } from "./store";

export function showOpenFileDialog(targetId: string) {
  WindowStore.update((ws) => {
    let index = null;

    for (let i = 0; i < ws.length; i++) {
      if (ws[i].id == targetId) {
        index = i;
        break;
      }
    }

    if (index == null) return ws;

    const overlay = generateChooserOverlayData();

    assignTarget(overlay.id, targetId);

    if (!ws[index].overlays) ws[index].overlays = {};

    ws[index].overlays[overlay.id] = overlay;

    return ws;
  });
}
