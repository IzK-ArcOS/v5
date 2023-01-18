import { get, writable } from "svelte/store";
import { Log, LogLevel } from "../../../console";
import type {
  CalculatorKey,
  CalculatorKeys,
  CalculatorOverrides,
} from "./interface";

export const CalculatorValue = writable<string>("");

class CL {
  constructor() {
    this.keys = this.compileKeys(this.allowedKeys, this.CAPTION_OVERRIDES);
  }

  allowedKeys = "+_-_/_*_7_8_9_**_4_5_6_%_1_2_3_%%C_._0_00_%%E".split("_");

  public ALTCLASSES = "+_-_/_*_**_%_.".split("_");
  public CAPTION_OVERRIDES: CalculatorOverrides = {
    "*": "x",
    "/": ":",
    "**": "^",
    "%": "mod()",
  };
  public FUNCTIONS: { [key: string]: [string, () => void, string] } = {
    "%%C": ["C", () => CalculatorValue.set(""), "clear"],
    "%%E": ["=", this.evaluate, "process"],
  };
  public keys: CalculatorKeys = [];

  private compileKeys(
    keys: string[],
    overrides: CalculatorOverrides
  ): CalculatorKeys {
    Log({
      source: "Calculator/main.ts: compileKeys",
      msg: `Compiling CalculatorKeys[] array with ${keys.length} keys and ${
        Object.values(overrides).length
      } overrides.`,
      level: LogLevel.info,
    });

    let value: CalculatorKeys = [];

    for (let i = 0; i < keys.length; i++) {
      let v: CalculatorKey = [null, null];

      v[0] = overrides[keys[i]] || keys[i];
      v[1] = keys[i];

      value.push(v);
    }

    return value;
  }

  public evaluate(): string | false {
    Log({
      source: "Calculator/main.ts: evaluate",
      msg: `Evaluating sum ("${get(CalculatorValue)}")`,
      level: LogLevel.info,
    });

    if (!CalculatorClass.isValid(get(CalculatorValue))) return false;

    const value = eval(get(CalculatorValue));

    CalculatorValue.set(value);

    return value;
  }

  private isValid(input: string) {
    Log({
      source: "Calculator/main.ts: isValid",
      msg: `Verifying input "${input}"...`,
      level: LogLevel.info,
    });

    if (input.startsWith("%%")) return false;

    for (let i = 0; i < input.length; i++) {
      if (!this.allowedKeys.includes(input[i])) {
        Log({
          source: "Calculator/main.ts: isValid",
          msg: `Input "${input}" not valid.`,
          level: LogLevel.warn,
        });

        return false;
      }
    }

    return true;
  }

  processKey(key: string) {
    Log({
      source: "Calculator/main.ts: processKey",
      msg: `Processing key "${key}"`,
      level: LogLevel.info,
    });

    if (!this.isValid(key)) return false;

    const newValue = get(CalculatorValue) + key + "0";

    try {
      eval(newValue);
    } catch {
      Log({
        source: "Calculator/main.ts: processKey",
        msg: `Test sum "${newValue}" is not valid. Aborting.`,
        level: LogLevel.error,
      });

      return false;
    }

    CalculatorValue.set(get(CalculatorValue) + key);
  }
}

export const CalculatorClass = new CL();
