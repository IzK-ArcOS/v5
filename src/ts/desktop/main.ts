import { writable } from "svelte/store";
import { setDesktopClassNameListener } from "./classes";
import { registerDesktopShortcuts } from "./shortcuts";

export const previouslyLoaded = writable<boolean>(false);
export const startOpened = writable<boolean>(false);
export const attentionId = writable<string>("");
export const showDesktop = writable<boolean>(false);
export const desktopClassNames = writable<string>("");

export function assignDesktopListeners() {
  setDesktopClassNameListener();
  registerDesktopShortcuts();
}
