import type { Writable } from "svelte/store";
import { restarting, showDesktop, shuttingDown } from "./main";
import { applyState } from "../state/main";
import { ArcSoundBus } from "../sound/main";

export function setPowerListeners() {
  const q = (w: Writable<boolean>, s: string) => {
    w.subscribe((v) => {
      if (!v) return;

      showDesktop.set(false);

      setTimeout(() => {
        ArcSoundBus.playSound("arcos.system.logoff");

        applyState(s);

        w.set(false);
      });
    });
  };

  q(shuttingDown, "shutdown");
  q(restarting, "restart");
}
