import { get } from "svelte/store";
import { readFile, writeFile } from "../api/fs/file";
import { Log, LogLevel } from "../console";
import { UserData } from "../userlogic/interfaces";
import type { ArcTermEnv } from "./env";
import type { ArcTerm } from "./main";

export class ArcTermConfig {
  env: ArcTermEnv;

  constructor(e: ArcTermEnv, t: ArcTerm) {
    Log({
      source: `ArcTerm ${t.referenceId}`,
      msg: `Creating new ArcTermConfig`,
      level: LogLevel.info,
    });

    this.env = e;
    this.loadConfigFile();
  }

  readonly configPath = "./arcterm.conf";
  private readonly configKeys = ["prompt", "greeting", "logo", "promptColor"];

  public getConfig() {
    const obj = {};

    for (let i = 0; i < this.configKeys.length; i++) {
      const k = this.configKeys[i];

      obj[k] = this.env[k];
    }

    return obj;
  }

  public loadConfig(json: object) {
    for (let i = 0; i < this.configKeys.length; i++) {
      const k = this.configKeys[i];

      const exists = this.env[k] != null && json;
      const isType = typeof this.env[k] == typeof json[k];

      if (exists && isType) this.env[k] = json[k];
    }
  }

  public async loadConfigFile() {
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
    const data = {};

    for (let i = 0; i < this.configKeys.length; i++) {
      const k = this.configKeys[i];

      data[k] = this.env[k];
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    await writeFile(this.configPath, blob);
  }
}
