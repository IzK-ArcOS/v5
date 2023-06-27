import type { Command } from "../interface";

import { inTauri } from "../../tauri";

export const Tauri: Command = {
  keyword: "tauri",
  async exec(cmd, argv, term) {
    const is = await inTauri();

    term.std.writeColor(
      `[STATUS]: You are ${is ? "in the Desktop app" : "in the Web version"}`,
      "aqua"
    );
  },
  description: "Check if you are in the desktop app or not",
};
