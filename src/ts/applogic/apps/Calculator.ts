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
    // @TODO fix this PLEASE
    keyboardShortcuts: [
      { key: "0", action: () => CalculatorClass.processKey("0") },
      { key: "1", action: () => CalculatorClass.processKey("1") },
      { key: "2", action: () => CalculatorClass.processKey("2") },
      { key: "3", action: () => CalculatorClass.processKey("3") },
      { key: "4", action: () => CalculatorClass.processKey("4") },
      { key: "5", action: () => CalculatorClass.processKey("5") },
      { key: "6", action: () => CalculatorClass.processKey("6") },
      { key: "7", action: () => CalculatorClass.processKey("7") },
      { key: "8", action: () => CalculatorClass.processKey("8") },
      { key: "9", action: () => CalculatorClass.processKey("9") },
      { key: "0", action: () => CalculatorClass.processKey("0") },
      { key: "/", action: () => CalculatorClass.processKey("/") },
      { key: "+", action: () => CalculatorClass.processKey("+") },
      { key: "-", action: () => CalculatorClass.processKey("-") },
      { key: "*", action: () => CalculatorClass.processKey("*") },
      { key: "^", action: () => CalculatorClass.processKey("^") },
      { key: "enter", action: () => CalculatorClass.evaluate() },
      { key: "c", action: () => CalculatorValue.set("") },
    ],
  },
};
