import logo from "../../../assets/apps/calculator.svg";
import Calculator from "../../../lib/Apps/Calculator.svelte";
import type { App } from "../interface";
import { CalculatorClass, CalculatorValue } from "./Calculator/main";

export const CalculatorApp: App = {
  info: {
    name: "Calculator",
    description: "ArcOS Calculator",
    builtin: true,
    version: "1.0.0",
    author: "Izaak Kuipers",
    icon: logo,
  },
  size: { w: 340, h: 413 },
  pos: { x: 60, y: 60 },
  minSize: { w: 340, h: 413 },
  maxSize: { w: 340, h: 413 },
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
