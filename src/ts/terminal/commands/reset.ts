import sleep from "../../sleep";
import type { Command } from "../interface";

export const Reset: Command = {
  keyword: "reset",
  async exec(cmd, argv, term) {
    term.std.writeLine(
      "Are you sure you want to reset ArcOS? This will not affect any ArcAPI data.\n\n"
    );
    const confirm = (await term.std.read("Y/N [", "]", 1)).toLowerCase();

    if (confirm != "y") return term.std.Error("Reset aborted.");

    localStorage.clear();
    location.reload();
    await sleep(3000);
  },
  description: "Reset local ArcOS instance",
};
