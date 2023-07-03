import ChooserOverlay from "../../lib/Apps/ChooserOverlay.svelte";
import type { OverlayableProcess } from "../applogic/interface";
import { generatePID } from "../applogic/pid";

export function generateChooserOverlayProcess(
  title: string = "Choose File"
): OverlayableProcess {
  return {
    overlayableApp: {
      info: {
        name: title,
        author: "ArcOS Generated",
        version: "1",
      },
      size: { w: NaN, h: NaN },
      id: "FileChooser",
      content: ChooserOverlay,
    },
    id: `FileChooser_${generatePID()}`,
    show: true,
  };
}
