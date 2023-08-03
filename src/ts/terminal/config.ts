import { get } from "svelte/store";
import { readFile, writeFile } from "../api/fs/file";
import { Log } from "../console";
import { UserData } from "../userlogic/interfaces";
import type { ArcTermEnv } from "./env";
import type { ArcTerm } from "./main";
import { LogLevel } from "../console/interface";

export class ArcTermConfig {
  env: ArcTermEnv;
  term: ArcTerm;

  constructor(e: ArcTermEnv, t: ArcTerm) {
    Log(
      `ArcTerm ${t.referenceId}`,
      `Creating new ArcTermConfig`,
      LogLevel.info
    );

    this.env = e;
    this.term = t;
    this.loadConfigFile();
  }

  readonly configPath = "./arcterm.conf";
  private readonly configKeys = [
    "prompt",
    "greeting",
    "logo",
    "promptColor",
    "gooseBumps",
  ];

  public getConfig() {
    Log(`ArcTerm ${this.term.referenceId}`, `config.getConfig`);

    const obj = {};

    for (let i = 0; i < this.configKeys.length; i++) {
      const k = this.configKeys[i];

      obj[k] = this.env[k];
    }

    return obj;
  }

  public loadConfig(json: object) {
    Log(`ArcTerm ${this.term.referenceId}`, `config.loadConfig: loading JSON`);

    for (let i = 0; i < this.configKeys.length; i++) {
      const k = this.configKeys[i];

      const exists = this.env[k] != null && json;
      const isType = typeof this.env[k] == typeof json[k];

      if (exists && isType) this.env[k] = json[k];
    }
  }

  public async loadConfigFile() {
    Log(
      `ArcTerm ${this.term.referenceId}`,
      `config.loadConfigFile: Getting ${this.configPath}`
    );

    if (!get(UserData)) return;

    const file = await readFile(this.configPath);

    if (!file) return this.writeConfig();

    const enc = new TextDecoder("utf-8");
    const d = enc.decode(new Uint8Array(file));

    let json;

    try {
      json = JSON.parse(d);
    } catch {
      json = {};
    }

    this.loadConfig(json);
  }

  public async writeConfig() {
    Log(
      `ArcTerm ${this.term.referenceId}`,
      `config.writeConfig: Writing ${this.configPath}`
    );

    const data = {};

    for (let i = 0; i < this.configKeys.length; i++) {
      const k = this.configKeys[i];

      if (
        k != "gooseBumps" ||
        (typeof this.env[k] === "boolean" && this.env[k] == true)
      )
        data[k] = this.env[k];
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    await writeFile(this.configPath, blob);
  }
}
