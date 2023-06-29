import { writable } from "svelte/store";

export const LOClicks = writable<number>(0);

LOClicks.subscribe((v) => console.log(v));
