import { Log } from "../console";
import { LogLevel } from "../console/interface";
import type { StaticVariableStore, Variable, VariableStore } from "./interface";
import type { ArcTerm } from "./main";
import { getArcTermStore } from "./var/store";

export class ArcTermVariables {
  term: ArcTerm;

  private store: VariableStore = {};

  constructor(t: ArcTerm) {
    Log(
      `ArcTerm ${t.referenceId}`,
      "Creating new ArcTermVariables",
      LogLevel.info
    );

    this.term = t;
    this.store = getArcTermStore(this.term);
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
    Log(`ArcTerm ${this.term.referenceId}`, `var.get: getting "${key}"`);

    if (!this.store[key]) return key;

    return this.store[key].get();
  }

  async set(key: string, value: string) {
    Log(
      `ArcTerm ${this.term.referenceId}`,
      `var.set: setting "${key}" to "${value}"`
    );

    if (!this.store[key]) {
      const variable: Variable = {
        get: () => variable.value,
        set: (v) => (variable.value = v),
        readOnly: false,
        canDelete: true,
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

  async delete(key: string) {
    Log(`ArcTerm ${this.term.referenceId}`, `var.delete: deleting "${key}"`);

    if (!this.store[key] || this.store[key].readOnly) return false;

    await this.set(key, "");

    return true;
  }

  replace(str: string) {
    const variables = this.parseInlineNames(str);

    if (!variables.length) return str;

    for (let i = 0; i < variables.length; i++) {
      const part = `$${variables[i]}`;

      const value = this.get(variables[i]);

      str = str.replace(part, value == variables[i] && part ? part : value);
    }

    return str;
  }

  private parseInlineNames(str: string): string[] {
    const regex = /\$([a-zA-Z_][a-zA-Z0-9_]*)/g;
    const matches: string[] = [];

    let match: RegExpExecArray | null;

    while ((match = regex.exec(str))) {
      matches.push(match[1]);
    }

    return matches;
  }
}
