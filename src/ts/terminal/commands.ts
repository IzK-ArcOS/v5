import { Log } from "../console";
import { LogLevel } from "../console/interface";
import { Default } from "./commands/default";
import type { ArcTerm } from "./main";
export class ArcTermCommandHandler {
  term: ArcTerm;
  history: string[] = [];

  constructor(term: ArcTerm) {
    Log(
      `ArcTerm ${term.referenceId}`,
      `Creating new ArcTermCommandHandler`,
      LogLevel.info
    );

    this.term = term;
  }

  public async evaluate(cmd: string, args?: string[], isScript = false) {
    Log(`ArcTerm ${this.term.referenceId}`, `cmd.evaluate: ${cmd}`);

    if (cmd.startsWith("#")) return;

    this.history.push(`${cmd} ${args.join(" ")}`.trim());

    const command = this.getCommand(cmd);

    if ((isScript && command.keyword == "default") || cmd == "exit")
      return false;

    if (this.term.input) this.term.input.current.disabled = true;

    const result = await command.exec(cmd, args, this.term);

    console.log(cmd, result);

    if (result == false) {
      return false;
    }

    if (!this.term.std || !this.term.input) return true;
    if (this.term.std.verbose && !isScript) this.term.std.writeLine("\n");

    this.term.input.unlock();

    return command.keyword != "default";
  }

  public getCommand(command: string) {
    Log(`ArcTerm ${this.term.referenceId}`, `cmd.getCommand: ${command}`);

    const c = command.toLowerCase();

    for (let i = 0; i < this.term.commands.length; i++) {
      const k = this.term.commands[i].keyword.toLowerCase();

      if (k == c) return this.term.commands[i];
    }

    return Default;
  }
}
