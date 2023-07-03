import { writable } from "svelte/store";
import { showOverlay } from "../../../window/overlay";
import { getPID } from "../../pid";
import type { AppManagerAction } from "./Manager";

export const staticAppManActions: AppManagerAction[] = [
  {
    caption: "Run...",
    icon: "directions_run",
    action: () => {
      showOverlay("run", getPID("AppMan"));
    },
  },
];

export const appManSelectedPid = writable<number>();
