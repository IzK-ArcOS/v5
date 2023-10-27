import Calculator from "../../../lib/Apps/Calculator.svelte";
import { CalculatorIcon } from "../../icon/apps";
import type { App } from "../interface";
import { CalculatorClass, CalculatorValue } from "./Calculator/main";

export const CalculatorApp: App = {
  info: {
    name: "Calculator",
    description: "ArcOS Calculator",
    builtin: true,
    version: "2.0.0",
    author: "Izaak Kuipers",
    icon: CalculatorIcon,
    appGroup: "utilities",
  },
  size: { w: 340, h: NaN },
  pos: { x: 60, y: 60 },
  minSize: { w: 340, h: 412 },
  maxSize: { w: 340, h: 422 },
  controls: { min: true, max: false, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: Calculator,
  glass: true,
  events: {
    close() {
      CalculatorValue.set("");
    },
    open() {
      CalculatorValue.set("");
    },
    keyboardShortcuts: [
      ...CalculatorClass.generateKeyboardShortcuts(),
      { key: "enter", action: () => CalculatorClass.evaluate() },
      { key: "escape", action: () => CalculatorValue.set("") },
    ],
  },
};
