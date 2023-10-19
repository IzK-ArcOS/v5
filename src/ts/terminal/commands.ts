import { Log } from "../console";
import { LogLevel } from "../console/interface";
import { Default } from "./commands/default";
import type { Command } from "./interface";
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

  public async evaluate(
    cmd: string,
    args?: string[],
    isScript = false,
    provider?: Command[]
  ) {
    Log(`ArcTerm ${this.term.referenceId}`, `cmd.evaluate: ${cmd}`);

    if (cmd.startsWith("#")) return;

    // Don't bother appending script lines to the history
    if (!isScript) this.history.push(`${cmd} ${args.join(" ")}`.trim());

    const command = this.getCommand(cmd, provider);

    if (isScript && command.keyword == "default") return false;

    if (this.term.input && this.term.input.current)
      this.term.input.current.disabled = true;

    const result = await command.exec(cmd, args, this.term);

    if (result == false) {
      return false;
    }

    if (!this.term.std || !this.term.input) return true;
    if (this.term.std.verbose && !isScript) this.term.std.writeLine("\n");

    this.term.input.unlock();

    return command.keyword != "default";
  }

  public getCommand(command: string, provider?: Command[]) {
    const c = command.toLowerCase();

    const commands = provider ? provider : this.term.commands;

    for (let i = 0; i < commands.length; i++) {
      const k = commands[i].keyword.toLowerCase();

      if (k == c) return commands[i];
    }

    return Default;
  }
}
