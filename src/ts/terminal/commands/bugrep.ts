import type { ReportOptions } from "../../reporting/interface";
import { sendReport } from "../../reporting/main";
import { switchExists } from "../argv";
import type { Command } from "../interface";

export const BugRep: Command = {
  keyword: "bugrep",
  async exec(cmd, argv, term) {
    const Regx = argv.join(" ").match(/"(.*?)"/);
    const includeUserData = !switchExists(argv, "no-ud");
    const includeApi = !switchExists(argv, "no-api");

    if (Regx && Regx.length > 1) {
      const text = term.vars.replace(Regx[1]);

      term.std.writeColor(
        "[BugRep]: Creating bug report...\n\n[ReportOptions]\n",
        "yellow"
      );

      const opt: ReportOptions = {
        includeApi,
        includeUserData,
        title: text,
      };

      term.std.writeLine(JSON.stringify(opt, null, 2) + "\n");

      const id = await sendReport(opt);

      term.std.Info(`Created with id [${id}]. Thank you!`);

      return;
    }

    term.std.Error("Unable to submit report: syntax invalid!");
  },
  description: "Create a bug report.",
  syntax: `"<[body]>" (--[no-ud]) (--[no-api])`,
  hidden: true,
};
