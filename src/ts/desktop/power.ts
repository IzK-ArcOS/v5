import { get } from "svelte/store";
import { closeWindow } from "../applogic/events";
import { WindowStore } from "../applogic/store";
import { loggingOff, restarting, shuttingDown } from "./main";

export function logoff() {
  let maxTimeout = 0;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    maxTimeout += 50;

    setTimeout(() => {
      closeWindow(ws[i].id);
    }, maxTimeout);
  }

  loggingOff.set(true);
}

export function shutdown() {
  let maxTimeout = 0;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    maxTimeout += 50;

    setTimeout(() => {
      closeWindow(ws[i].id);
    }, maxTimeout);
  }

  shuttingDown.set(true);
}

export function restart() {
  let maxTimeout = 0;

  const ws = get(WindowStore);

  for (let i = 0; i < ws.length; i++) {
    maxTimeout += 50;

    setTimeout(() => {
      closeWindow(ws[i].id);
    }, maxTimeout);
  }

  restarting.set(true);
}
