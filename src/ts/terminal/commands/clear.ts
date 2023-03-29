import type { Command } from "../interface";

export const Clear: Command = {
  keyword: "clear",
  exec(cmd, argv, term) {
    term.input.current = null;

    setTimeout(() => {
      term.std.clear();

      term.input.unlock();
    });
  },
  description: "Clears the screen",
};
