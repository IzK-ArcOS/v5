import { get } from "svelte/store";
import { getDirectory } from "../api/fs/directory";
import { ArcOSVersion } from "../env/main";
import { UserName } from "../userlogic/interfaces";
import {
  Color,
  colors,
  StaticVariableStore,
  Variable,
  VariableStore,
} from "./interface";
import type { ArcTerm } from "./main";

export class ArcTermVariables {
  term: ArcTerm;

  private store: VariableStore = {
    prompt: {
      get: () => this.term.env.prompt,
      set: async (v) => {
        this.term.env.prompt = v;

        await this.term.env.config.writeConfig();
      },

      readOnly: false,
    },
    server: {
      get: () => localStorage.getItem("arcos-server"),
      readOnly: true,
    },
    username: {
      get: () => get(UserName),
      readOnly: true,
    },
    version: {
      get: () => ArcOSVersion,
      readOnly: true,
    },
    pwd: {
      get: () => this.term.path,
      set: async (v) => {
        const dir = await getDirectory(v);

        if (!dir)
          return this.term.util.Error(
            `pwd: Directory doesn't exist, falling back.`
          );

        this.term.path = v;
      },
      readOnly: false,
    },
    color: {
      get: () => this.term.env.promptColor,
      set: async (v) => {
        if (!colors.includes(v))
          return this.term.util.Error("color is invalid, falling back.");

        this.term.env.promptColor = v as Color;

        await this.term.env.config.writeConfig();

        this.term.flushAccent();
      },
      readOnly: false,
    },
  };

  constructor(t: ArcTerm) {
    this.term = t;
  }

  async getAll(): Promise<StaticVariableStore> {
    const result: StaticVariableStore = {};
    const entries = Object.entries(this.store);

    for (let i = 0; i < entries.length; i++) {
      const key = entries[i][0];
      const value = this.get(key);

      const ro = entries[i][1].readOnly;

      result[key] = { value, readOnly: ro };
    }

    return result;
  }

  get(key: string) {
    if (!this.store[key]) return key;

    return this.store[key].get();
  }

  async delete(key: string) {
    if (!this.store[key] || this.store[key].readOnly) return false;

    delete this.store[key];

    return true;
  }

  async set(key: string, value: string) {
    if (!this.store[key]) {
      const variable: Variable = {
        get: () => variable.value,
        set: (v) => (variable.value = v),
        readOnly: false,
        value,
      };

      this.store[key] = variable;

      return true;
    }

    if (this.store[key].readOnly) return false;

    const variable = this.store[key];

    if (!variable) return false;

    await variable.set(value);

    return true;
  }

  inline(str: string) {
    const parts = str.split(/\$(\w*)/);

    let out = "";

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const value = this.get(part);

      out += value || part;
    }

    return out;
  }
}
