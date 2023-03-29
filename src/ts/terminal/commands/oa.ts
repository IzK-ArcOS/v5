import { get } from "svelte/store";
import { openWindow } from "../../applogic/events";
import { WindowStore } from "../../applogic/store";
import type { Command } from "../interface";

export const oa: Command = {
  keyword: "oa",
  exec(cmd, argv, term) {
    const ws = get(WindowStore);

    for (let i = 0; i < ws.length; i++) {
      if (ws[i].info.custom) continue;

      term.std.writeColor(`Opening [${ws[i].id}]`, "orange");

      openWindow(ws[i].id, true);
    }
  },
  description: "Open all apps",
};
