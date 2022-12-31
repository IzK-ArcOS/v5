import { get, writable } from "svelte/store";

export const ActionCenterOpened = writable<boolean>(false);

export function toggleActionCenter() {
  const newValue = !get(ActionCenterOpened);

  ActionCenterOpened.set(newValue);
}
