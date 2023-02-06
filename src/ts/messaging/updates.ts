import { get, writable } from "svelte/store";

export const MessagingUpdaters = writable<(() => void)[]>([]);

export function messageSubscribe(cb: () => void) {
  const updaters = get(MessagingUpdaters);

  updaters.push(cb);

  MessagingUpdaters.set(updaters);
}

export function messageUpdateTrigger() {
  const updaters = get(MessagingUpdaters);

  for (let i = 0; i < updaters.length; i++) {
    updaters[i]();
  }
}
