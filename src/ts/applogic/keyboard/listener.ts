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
  (document.activeElement as HTMLDivElement).blur();

  if (get(CurrentState).key != "desktop") return;

  for (let i = 0; i < appShortcuts.length; i++) {
    const entry = appShortcuts[i];
    const combos = entry[1];

    for (let j = 0; j < combos.length; j++) {
      const alt = combos[j].alt ? e.altKey : true;
      const ctrl = combos[j].ctrl ? e.ctrlKey : true;
      const shift = combos[j].shift ? e.shiftKey : true;
      const key = combos[j].key.trim().toLowerCase();

      if (
        alt &&
        ctrl &&
        shift &&
        key == e.key.toLowerCase().trim() &&
        (get(focusedWindowId) == entry[0] || combos[j].global)
      ) {
        combos[j].action(combos[j].global ? null : getWindow(entry[0]));
      }
    }
  }
}
