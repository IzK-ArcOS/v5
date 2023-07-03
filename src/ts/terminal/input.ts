import { get, writable } from "svelte/store";
import { focusedProcessPid } from "../applogic/store";
import { Log, LogLevel } from "../console";
import { UserName } from "../userlogic/interfaces";
import type { ArcTermEnv } from "./env";
import type { ArcTerm } from "./main";
import { getServer } from "../api/server";

export class ArcTermInput {
  private lockInput = false;
  target: HTMLDivElement;
  env: ArcTermEnv;
  term: ArcTerm;
  current: HTMLInputElement;

  constructor(T: ArcTerm) {
    Log({
      source: `ArcTerm ${T.referenceId}`,
      msg: `Creating new ArcTermInput`,
      level: LogLevel.info,
    });

    this.target = T.target;
    this.env = T.env;
    this.term = T;

    this.commandLoop();
  }

  public commandLoop() {
    setInterval(() => {
      if (this.lockInput) return;

      this.lock();

      const prompt = this.createPrompt();

      if (!prompt) return;

      this.target.append(prompt);
    });
  }

  public lock() {
    this.lockInput = true;
  }

  public unlock() {
    this.lockInput = false;
  }

  private getPrompt() {
    const username = get(UserName);
    const server = getServer();
    const path = (this.term.path || "./").replace("./", "");
    const prompt = this.env.prompt
      .replace("&u", username)
      .replace("&s", server)
      .replace("&p", path);

    return prompt;
  }

  public createPrompt() {
    if (this.current) this.current.disabled = true;

    if (!this.term.std) return;

    const wrap = document.createElement("div");
    const inner = document.createElement("div");
    const input = document.createElement("input");

    wrap.className = "prompt";

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
      if (this.term.process && get(focusedProcessPid) == this.term.process.id)
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
    const hist = this.term.commandHandler.history;
    const latest = hist[hist.length - 1];

    if (!this.current || !latest) return;

    this.current.value = latest;
  }

  public async processCommands(split: string[]) {
    for (let i = 0; i < split.length; i++) {
      const str = this.term.vars.replace(split[i].trim());
      const args = str.split(" ");
      const cmd = args[0];

      args.shift();

      await this.term.commandHandler.evaluate(cmd, args);

      this.lock();
    }

    this.unlock();
  }
}
