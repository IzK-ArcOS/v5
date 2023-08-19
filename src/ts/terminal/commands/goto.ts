import type { Command } from "../interface";

export const Goto: Command = {
  keyword: "goto",
  async exec(cmd, argv, term) {
    const sectName = argv[0];
    const sect = term.sect.get(sectName);

    if (!sect) term.std.Error(`Can't find section ${sectName}`);

    const result = await term.input.processCommands(sect || []);

    if (!result) return false;
  },
  description: "Goto a section",
};
