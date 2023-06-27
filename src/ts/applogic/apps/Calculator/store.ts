/**
 * CalculatorApp 1.0.0
 *
 * Authored by Izaak Kuipers, development started January 20th 2023.
 *
 * All code in this file is written by the author and licensed under GPLv3.
 *
 * Original filename: src/ts/applogic/apps/Calculator/store.ts
 */

import type { CalculatorOverrides } from "./interface";
import { CalculatorClass, CalculatorValue } from "./main";

class CS {
  public Source = "Calculator/main.ts:";
  public AllowedKeys = [
    "+",
    "-",
    "/",
    "*",
    "7",
    "8",
    "9",
    "**",
    "4",
    "5",
    "6",
    "%",
    "1",
    "2",
    "3",
    "%%C",
    ".",
    "0",
    "00",
    "%%E",
  ];
  public Shortcuts = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "/",
    "+",
    "-",
    "*",
  ];
  public Overrides: CalculatorOverrides = {
    "*": "x",
    "**": "^",
    "%": "mod",
  };
  public altClasses = ["+", "-", "/", "*", "**", "%", "."];
}

export const CalculatorStore = new CS();
