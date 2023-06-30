import type { Writable } from "svelte/store";
import { restarting, showDesktop, shuttingDown } from "./main";
import { applyState } from "../state/main";

export function setPowerListeners() {
  const q = (w: Writable<boolean>, s: string) => {
    w.subscribe((v) => {
      if (!v) return;

      showDesktop.set(false);

      setTimeout(() => {
        applyState(s);

        w.set(false);
      });
    });
  };

  q(shuttingDown, "shutdown");
  q(restarting, "restart");
}
