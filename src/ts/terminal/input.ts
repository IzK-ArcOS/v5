import { get } from "svelte/store";
import { focusedWindowId } from "../applogic/store";
import { Log } from "../console";
import type { ArcTermEnv } from "./env";
import type { ArcTerm } from "./main";

export class ArcTermInput {
  private lockInput = false;
  target: HTMLDivElement;
  env: ArcTermEnv;
  term: ArcTerm;
  current: HTMLInputElement;

  constructor(T: ArcTerm) {
    Log(`ArcTerm ${T.referenceId}`, `Creating new ArcTermInput`);

    this.target = T.target;
    this.env = T.env;
    this.term = T;

    this.commandLoop();
  }

  public commandLoop() {
    Log(
      `ArcTerm ${this.term.referenceId}`,
      `input.commandLoop: Starting command loop`
    );

    setInterval(() => {
      if (this.lockInput) return;

      this.lock();

      const prompt = this.createPrompt();

      if (!prompt) return;

      this.target.append(prompt);
    });
  }

  public lock() {
    Log(`ArcTerm ${this.term.referenceId}`, `input.lock`);

    this.lockInput = true;
  }

  public unlock() {
    Log(`ArcTerm ${this.term.referenceId}`, `input.unlock`);

    this.lockInput = false;
  }

  private getPrompt() {
    Log(`ArcTerm ${this.term.referenceId}`, `input.getPrompt`);

    return this.term.vars.replace(this.env.prompt);
  }

  public createPrompt() {
    Log(`ArcTerm ${this.term.referenceId}`, `input.createPrompt`);

    if (this.current) this.current.disabled = true;

    if (!this.term.std) return;

    const wrap = document.createElement("div");
    const inner = document.createElement("div");
    const input = document.createElement("input");

    wrap.className = "prompt";

    if (this.term.std.verbose)
      this.term.std.writeColor(
        this.getPrompt(),
        this.env.promptColor,
        "white",
        true,
        wrap
      );

    input.id = `input#${Math.floor(Math.random() * 1e9)}`;
    input.spellcheck = false;
    input.addEventListener("keydown", (e) => this.processInputEvent(e, input));

    this.current = input;

    inner.className = "inner";
    inner.append(input);

    wrap.append(inner);

    setTimeout(() => {
      if (this.term.app && get(focusedWindowId) == this.term.app.id)
        input.focus();
    });

    return wrap;
  }

  private async processInputEvent(e: KeyboardEvent, input: HTMLInputElement) {
    const split = input.value.split("&&");
    const key = e.key.toLowerCase();

    switch (key) {
      case "enter":
        this.processCommands(split);
        break;
      case "f2":
        this.restorePreviousCommand();
        break;
    }
  }

  private restorePreviousCommand() {
    Log(`ArcTerm ${this.term.referenceId}`, `input.restorePreviousCommand`);

    const hist = this.term.commandHandler.history;
    const latest = hist[hist.length - 1];

    if (!this.current || !latest) return;

    this.current.value = latest;
  }

  public async processCommands(split: string[], file = "") {
    Log(
      `ArcTerm ${this.term.referenceId}`,
      `input.processCommands: ${split.length} parts`
    );

    for (let i = 0; i < split.length; i++) {
      const str = this.term.vars.replace(split[i].trim());
      const args = str.split(" ");
      const cmd = args[0];

      if (cmd.startsWith("#")) continue;

      args.shift();

      const success = await this.term.commandHandler.evaluate(
        cmd,
        args,
        !!file
      );

      if (!success && file) {
        this.term.std.Error(
          `${cmd}: command not found (${file}, line ${i + 1})`
        );

        return;
      }

      this.lock();
    }

    this.unlock();
  }
}
