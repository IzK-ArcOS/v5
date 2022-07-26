import type { SvelteComponentDev } from "svelte/internal";

export interface App {
  info: GeneralAppInfo;
  pos: XY;
  minSize: Size;
  maxSize: Size;
  controls: ControlsState;
  menubar?: WindowMenuBar;
  state: AppStates;
  content: typeof SvelteComponentDev;
}

export interface GeneralAppInfo {
  name: string;
  description: string;
  builtin: boolean;
  version: string;
  author?: string;
}

export interface AppStates {
  headless: boolean;
  resizable: boolean;
  windowState: WindowState;
}

export type Size = { w: number; h: number };
export type XY = { x: number; y: number };
export interface WindowState {
  min: boolean; // Minimized
  max: boolean; // Maximized
  fll: boolean; // Fullscreen
}

export interface ControlsState {
  min: boolean; // Minimized
  max: boolean; // Maximized
  cls: boolean; // Close
}

export interface WindowMenuBar {
  leftItems: WindowMenuItem[];
  rightItems: WindowMenuItem[];
  visibleOnHeadless: boolean;
  visibleOnFullscreen: boolean;
}

export interface WindowMenuItem {
  type: WindowMenuBarItemType;
  caption?: string;
  click?: (e: MouseEvent) => void;
  menuItems?: WindowMenuItem[];
}

/**
 * sep: Separator
 * btn: Button
 * mnu: Menu
 */
export type WindowMenuBarItemType = "sep" | "btn" | "mnu";
