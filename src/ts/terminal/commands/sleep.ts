import sleep from "../../sleep";
import type { Command } from "../interface";

export const SleepCommand: Command = {
  keyword: "sleep",
  async exec(cmd, argv, term) {
    try {
      const duration = JSON.parse(argv[0]);

      if (typeof duration !== "number")
        return term.std.Error("Invalid duration.");

      await sleep(duration as number);
    } catch {
      term.std.Error("Failed to parse duration.");
    }
  },
  description: "wait for a given amount of milliseconds.",
};
