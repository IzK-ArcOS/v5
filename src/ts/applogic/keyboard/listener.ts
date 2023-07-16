import { get } from "svelte/store";
import { Log } from "../../console";
import { CurrentState } from "../../state/main";
import { focusedWindowId, getWindow } from "../store";
import { appShortcuts } from "./main";
import { LogLevel } from "../../console/interface";

const banned = ["tab", "pagedown", "pageup"];

export function startKeyListener() {
  Log(
    "keyboard/listener.ts: startKeyListener",
    "Starting key listener",
    LogLevel.info
  );

  document.addEventListener("keydown", processEvent);
}

export function stopKeyListener() {
  Log(
    "keyboard/listener.ts: stopKeyListener",
    "Stopping key listener",
    LogLevel.warn
  );

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
      const isFocused = get(focusedWindowId) == entry[0] || combos[j].global;

      if (!modifiers || (key != pK && key) || !isFocused) continue;

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
