import logo from "../../../assets/apps/calculator.svg";
import Calculator from "../../../lib/Apps/Calculator.svelte";
import type { App } from "../interface";
import { CalculatorClass, CalculatorValue } from "./Calculator/main";

export const CalculatorApp: App = {
  info: {
    name: "Calculator",
    description: "ArcOS Calculator",
    builtin: true,
    version: "2.0.0",
    author: "Izaak Kuipers",
    icon: logo,
  },
  initialSize: { w: 340, h: NaN },
  minSize: { w: 340, h: NaN },
  maxSize: { w: 340, h: NaN },
  controls: { minimized: true, maximized: false, close: true },
  windowProperties: {
    headless: false,
    resizable: false,
  },
  initialWindowState: { minimized: false, maximized: false, fullscreen: false },
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
