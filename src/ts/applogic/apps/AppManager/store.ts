import { writable } from "svelte/store";
import { showOverlay } from "../../../window/overlay";
import type { AppManagerAction } from "./interface";

export const staticAppManActions: AppManagerAction[] = [
  {
    caption: "Run...",
    icon: "directions_run",
    action: () => {
      showOverlay("run", "AppMan");
    },
  },
];

export const appManSelected = writable<string>();
