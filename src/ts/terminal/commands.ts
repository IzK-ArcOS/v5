import { Log } from "../console";
import { LogLevel } from "../console/interface";
import type { ArcTerm } from "./main";
import { defaultCommand } from "./store";

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

  public async evaluate(cmd: string, args?: string[]) {
    Log(`ArcTerm ${this.term.referenceId}`, `cmd.evaluate: ${cmd}`);

    this.history.push(`${cmd} ${args.join(" ")}`.trim());

    const command = this.getCommand(cmd);

    if (this.term.input) this.term.input.current.disabled = true;

    await command.exec(cmd, args, this.term);

    if (!this.term.std || !this.term.input) return;
    if (this.term.std.verbose) this.term.std.writeLine("\n");
    
    this.term.input.unlock();
  }

  public getCommand(command: string) {
    Log(`ArcTerm ${this.term.referenceId}`, `cmd.getCommand: ${command}`);

    const c = command.toLowerCase();

    for (let i = 0; i < this.term.commands.length; i++) {
      const k = this.term.commands[i].keyword.toLowerCase();

      if (k == c) return this.term.commands[i];
    }

    return defaultCommand;
  }
}
