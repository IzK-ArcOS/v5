import { ArcOSVersion } from "./main";

export interface Variable {
  value: VariableValue;
  readonly: boolean;
}

export type VariableValue = string | boolean | number | any[];

export const Variables = new Map<string, Variable>([
  [
    "osname",
    {
      value: "ArcOS",
      readonly: true,
    },
  ],
  [
    "version",
    {
      value: ArcOSVersion,
      readonly: true,
    },
  ],
]);

export const Var = {
  getValue: (key: string): VariableValue | undefined => {
    if (Variables.has(key)) return Variables.get(key).value;

    return undefined;
  },

  setValue: (key: string, value: VariableValue): boolean => {
    if (Variables.has(key)) {
      const data = Variables.get(key);

      if (data.readonly) return false;

      data.value = value;

      Variables.set(key, data);

      return true;
    }

    const data: Variable = {
      readonly: false,
      value,
    };

    Variables.set(key, data);

    return true;
  },
};
