import { get, writable } from "svelte/store";

export const actionCenterOpened = writable<boolean>(false);

export function toggleActionCenter() {
  const newValue = !get(actionCenterOpened);

  actionCenterOpened.set(newValue);
}
