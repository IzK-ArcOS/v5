import type { Command } from "../interface";

export const If: Command = {
  keyword: "if",
  async exec(cmd, argv, term) {
    const regex =
      /\[(?: |)\"(?<e1>.*?)\"(?: |)(?<mode>!=|==)(?: |)\"(?<e2>.*?)\"(?: |)\](?: |)(?<cmd>.+)/gm;

    const str = argv.join(" ");
    const r = regex.exec(str);

    if (!r || !r.groups) {
      term.std.Error("Invalid statement!");
      return false;
    }

    const result = r.groups as IfGroups;
    const split = result.cmd.split(" ");
    const command = split[0];
    split.shift();

    async function doIt() {
      return await term.commandHandler.evaluate(command, split, true);
    }

    if (result.mode == "!=" && result.e1 !== result.e2) {
      return await doIt();
    }

    if (result.mode == "==" && result.e1 === result.e2) {
      return await doIt();
    }
  },
  description: "Test a condition to execute some code",
};

type IfGroups = {
  cmd: string;
  e1: string;
  e2: string;
  mode: "==" | "!=";
};
