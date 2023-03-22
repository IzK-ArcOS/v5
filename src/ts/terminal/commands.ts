import type { ArcTerm } from "./main";
import { defaultCommand } from "./store";

export class ArcTermCommandHandler {
  term: ArcTerm;
  history: string[] = [];

  constructor(term: ArcTerm) {
    this.term = term;
  }

  public async evaluate(cmd: string, args?: string[]) {
    this.history.push(`${cmd} ${args.join(" ")}`);

    const command = this.getCommand(cmd);

    this.term.input.current.disabled = true;

    await command.exec(cmd, args, this.term);

    if (!this.term.util || !this.term.input) return;

    this.term.util.writeLine("\n");
    this.term.input.unlock();
  }

  public getCommand(command: string) {
    const c = command.toLowerCase();

    for (let i = 0; i < this.term.commands.length; i++) {
      const k = this.term.commands[i].keyword.toLowerCase();

      if (k == c) return this.term.commands[i];
    }

    return defaultCommand;
  }
}
