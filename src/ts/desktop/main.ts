import { writable } from "svelte/store";
import { setDesktopClassNameListener } from "./classes";
import { setPowerListeners } from "./powerListeners";
import { registerDesktopShortcuts } from "./shortcuts";

export const previouslyLoaded = writable<boolean>(false);
export const startOpened = writable<boolean>(false);
export const shuttingDown = writable<boolean>(false);
export const restarting = writable<boolean>(false);
export const showDesktop = writable<boolean>(false);
export const desktopClassNames = writable<string>("");

export function assignDesktopListeners() {
  setDesktopClassNameListener();
  setPowerListeners();
  registerDesktopShortcuts();
}
