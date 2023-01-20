import { isOpened } from "../../checks";
import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
  openWindow,
} from "../../events";
import type { App } from "../../interface";
import { updateStores } from "../../store";
import type { AppPokerProperty } from "./Manager";

// All the properties for the AppPoker app buttons.
export const AppPokerProperties: AppPokerProperty[] = [
  {
    caption: "Minimize",
    action: (app: App) => {
      minimizeWindow(app);
    },
    getter: (app: App) => {
      return app.state.windowState.min;
    },
  },
  {
    caption: "Maximize",
    action: (app: App) => {
      maximizeWindow(app);
    },
    getter: (app: App) => {
      return app.state.windowState.max;
    },
  },
  {
    caption: "Close",
    action: (app: App) => {
      if (isOpened(app.id)) closeWindow(app.id);
      else openWindow(app.id);
    },
    getter: (app: App) => {
      return !isOpened(app.id);
    },
  },
  {
    caption: "Headless",
    action: (app: App) => {
      app.state.headless = !app.state.headless;

      updateStores();
    },
    getter: (app: App) => {
      return app.state.headless;
    },
  },
  {
    caption: "Fullscreen",
    action: (app: App) => {
      app.state.windowState.fll = !app.state.windowState.fll;
      updateStores();
    },
    getter: (app: App) => {
      return app.state.windowState.fll;
    },
  },
  {
    caption: "Resizable",
    action: (app: App) => {
      app.state.resizable = !app.state.resizable;
      updateStores();
    },
    getter: (app: App) => {
      return app.state.resizable;
    },
  },
  {
    caption: "Glass",
    action: (app: App) => {
      app.glass = !app.glass;
      updateStores();
    },
    getter: (app: App) => {
      return app.glass;
    },
  },
];
