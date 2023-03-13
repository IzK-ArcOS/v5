import { writable } from "svelte/store";

export const draggingId = writable<string>();
export const leftZoneTriggered = writable<boolean>(false);
export const rightZoneTriggered = writable<boolean>(false);
