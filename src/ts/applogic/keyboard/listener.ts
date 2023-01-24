import { get } from "svelte/store";
import { Log, LogLevel } from "../../console";
import { CurrentState } from "../../state/main";
import { focusedWindowId, getWindow } from "../store";
import { appShortcuts } from "./main";

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
      const isFocused = get(focusedWindowId) == entry[0] || combos[j].global;

      if (!modifiers || key != pK || !isFocused) continue;

      const app = combos[j].global ? null : getWindow(entry[0]);

      combos[j].action(app);
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
