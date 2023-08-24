import type { Command } from "../interface";

export const Goto: Command = {
  keyword: "goto",
  async exec(cmd, argv, term) {
    const sectName = argv[0];
    const sect = term.sect.get(sectName);

    if (!sect) {
      term.std.Error(`Can't find section ${sectName}`);

      return false;
    }

    await term.input.processCommands(sect || [], `<Sect ${sectName}>`);

    return false;
  },
  description: "Goto a section",
};
