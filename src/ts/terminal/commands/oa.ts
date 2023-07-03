import { get } from "svelte/store";
import { createProcess } from "../../applogic/events";
import { AppStore } from "../../applogic/store";
import type { Command } from "../interface";

export const oa: Command = {
  keyword: "oa",
  exec(cmd, argv, term) {
    const appStore = Object.entries(get(AppStore));

    for (let i = 0; i < appStore.length; i++) {
      if (appStore[i][1].info.custom) continue;

      term.std.writeColor(`Opening [${appStore[i][1].id}]`, "orange");

      createProcess(appStore[i][1].id, term.process.id);
    }
  },
  description: "Open all apps",
};
