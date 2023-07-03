import { createOverlayableError } from "../../../errorlogic/overlay";
import icon from "../../../../assets/apps/lightsoff.svg";
import { LO_LEVEL, loadLevel } from "./grid/levels";
import { LOContainsLights } from "./grid";
import { LOClicks } from "./game";
import { get } from "svelte/store";
import { getPID } from "../../pid";
export function LOFinish() {
  LO_LEVEL.set(0);
  LOClicks.set(0);
  loadLevel(get(LO_LEVEL));

  createOverlayableError(
    {
      title: "You Win!",
      message:
        "You've managed to complete all 8 levels of Lights Off. The game will be reset so you can play it again in the future.",
      buttons: [{ caption: "OK", action() {} }],
      image: icon,
    },
    getPID("LightsOff")
  );

  return false;
}
