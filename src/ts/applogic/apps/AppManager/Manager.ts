import { writable, Writable } from "svelte/store";
import type { App } from "../../interface";

// The appdata to pass to the AppPoker app.
export const AppPokerData: Writable<App> = writable<App>(null);

// The manageable property interface for the AppPoker app buttons.
export interface AppPokerProperty {
  caption: string;
  action: (app: App) => void;
  getter: (app: App) => boolean;
}
