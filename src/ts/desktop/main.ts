import { writable } from "svelte/store";

export const startOpened = writable<boolean>(false);
export const loggingOff = writable<boolean>(false);
export const shuttingDown = writable<boolean>(false);
export const restarting = writable<boolean>(false);
