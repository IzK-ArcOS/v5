import { readFile, writeFile } from "../api/fs/file";
import type { ArcTermEnv } from "./env";

export class ArcTermConfig {
  env: ArcTermEnv;

  constructor(e: ArcTermEnv) {
    this.env = e;

    this.loadConfigFile();
  }

  private readonly configPath = "./@arcterm";
  private readonly configKeys = ["prompt", "greeting"];

  public loadConfig(json: object) {
    for (let i = 0; i < this.configKeys.length; i++) {
      const k = this.configKeys[i];

      if (this.env[k] && json[k]) this.env[k] = json[k];
    }
  }

  public async loadConfigFile() {
    const file = await readFile(this.configPath);

    if (!file) return this.writeConfig();

    const d = String.fromCharCode.apply(null, new Uint8Array(file));

    let json;

    try {
      json = JSON.parse(d);
    } catch {
      json = {};
    }

    this.loadConfig(json);
  }

  private async writeConfig() {
    const data = {};

    for (let i = 0; i < this.configKeys.length; i++) {
      const k = this.configKeys[i];

      data[k] = this.env[k];
    }

    const blob = new Blob([JSON.stringify(data)], { type: "application/json" });

    await writeFile(this.configPath, blob);
  }
}
