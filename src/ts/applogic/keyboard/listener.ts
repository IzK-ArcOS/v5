import { get } from "svelte/store";
import { Log, LogLevel } from "../../console";
import { CurrentState } from "../../state/main";
import { focusedProcessPid, ProcessStore } from "../store";
import { appShortcuts } from "./main";

const banned = ["tab", "pagedown", "pageup"];

export function startKeyListener() {
  Log({
    source: "keyboard/listener.ts: startKeyListener",
    msg: "Starting key listener",
    level: LogLevel.info,
  });

  document.addEventListener("keydown", processEvent);
}

export function stopKeyListener() {
  Log({
    source: "keyboard/listener.ts: stopKeyListener",
    msg: "Stopping key listener",
    level: LogLevel.warn,
  });

  document.removeEventListener("keydown", processEvent);
}

function processEvent(e: KeyboardEvent) {
  if (!e.key) return;

  if (banned.includes(e.key.toLowerCase())) {
    e.preventDefault();

    return false;
  }

  unfocusActiveElement();

  if (get(CurrentState).key != "desktop") return;

  for (let i = 0; i < appShortcuts.length; i++) {
    const entry = appShortcuts[i];
    const combos = entry[1];

    for (let j = 0; j < combos.length; j++) {
      const alt = combos[j].alt ? e.altKey : true;
      const ctrl = combos[j].ctrl ? e.ctrlKey : true;
      const shift = combos[j].shift ? e.shiftKey : true;
      /** */
      const modifiers = alt && ctrl && shift;
      /** */
      const pK = e.key.toLowerCase().trim();
      const key = combos[j].key.trim().toLowerCase();
      /** */
      const isFocused = get(focusedProcessPid) == entry[0] || combos[j].global;

      if (!modifiers || (key != pK && key) || !isFocused) continue;

      const pid = combos[j].global ? null : entry[0];

      combos[j].action(pid);
    }
  }
}

function unfocusActiveElement() {
  const el = document.activeElement as HTMLButtonElement;

  if (
    !el ||
    el instanceof HTMLInputElement ||
    el instanceof HTMLTextAreaElement
  )
    return;

  el.blur();
}
