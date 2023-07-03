import { writable } from "svelte/store";

export const draggingPid = writable<number>();
export const leftZoneTriggered = writable<boolean>(false);
export const rightZoneTriggered = writable<boolean>(false);
