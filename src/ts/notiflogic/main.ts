import { get, Writable, writable } from "svelte/store";
import type { NotificationData, NotificationStore as NST } from "./interfaces";
import { isDisabled } from "../applogic/checks";
import { errorMessage } from "../errorlogic/main";

export const CurrentNotification: Writable<string> = writable<string>(null);
export const NotificationStore: Writable<NST> = writable<NST>({});

let globalNotifTimeout: ReturnType<typeof setTimeout>;

export function makeNotification(data: NotificationData) {
  if (isDisabled("ArcShell")) {
    errorMessage(
      data.title,
      data.message,
      data.image,
      null,
      { caption: "OK", action() {} },
      ...data.buttons
    );
    return;
  }

  clearTimeout(globalNotifTimeout);

  const id = `${Math.floor(Math.random() * 1e9)}`;
  const ns = get(NotificationStore);

  ns[id] = data;

  NotificationStore.set(ns);
  setTimeout(() => {
    CurrentNotification.set(id);
  }, 100);

  if (data.timeout)
    globalNotifTimeout = setTimeout(() => {
      CurrentNotification.set(null);
    }, data.timeout);

  return id;
}

export function closeNotification() {
  CurrentNotification.set(null);
}

export function deleteNotification(id: string) {
  const ns = get(NotificationStore);

  delete ns[id];

  NotificationStore.set(ns);

  if (get(CurrentNotification) == "id") closeNotification();
}
