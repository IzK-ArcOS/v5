import type { SvelteComponent, SvelteComponentDev } from "svelte/internal";
import type { ErrorButton } from "../errorlogic/app";
import type { AppKeyCombinations } from "./keyboard/interface";
export interface App {
  info: GeneralAppInfo;
  pos: XY;
  size: Size;
  minSize: Size;
  maxSize: Size;
  controls: ControlsState;
  menubar?: WindowMenuBar;
  state: AppStates;
  content: typeof SvelteComponentDev;
  id?: string;
  glass: boolean;
  events?: AppEvents;
  disabled?: boolean;
  opened?: boolean;
  parentId?: string;
  overlays?: { [key: string]: OverlayableApp };
  errorOverlays?: OverlayableError[];
  children?: { [key: string]: App };
  fileMimes?: string[];
  openedFile?: ArcFile;
  contextMenu?: AppContextMenu;
}

export interface ArcFile {
  name: string;
  path: string;
  data: ArrayBuffer;
  mime: string;
  anymime?: boolean;
}

export interface OverlayableError {
  title: string;
  message: string;
  buttons: ErrorButton[];
  image?: string;
  id?: string;
}

export interface OverlayableApp {
  info: OverlayableAppInfo;
  size: Size;
  content?: typeof SvelteComponentDev;
  parentId?: string;
  id?: string;
  show: boolean;
}

export interface GeneralAppInfo {
  name: string;
  description: string;
  builtin: boolean;
  version: string;
  author?: string;
  hidden?: boolean;
  titleSuffix?: string;
  icon: string;
  custom?: boolean;
  onlineOnly?: boolean;
}

export interface OverlayableAppInfo {
  name: string;
  author: string;
  version: string;
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

export interface ContextMenuItem {
  caption: string;
  icon?: string;
  image?: string;
  action(window: App, data: DOMStringMap, scope: string): void;
}

export type AppContextMenu = { [key: string]: ContextMenuItem[] };

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

export interface AppEvents {
  open?(app: App): void;
  close?(app: App): void;
  maximize?(app: App): void;
  minimize?(app: App): void;
  enterFullscreen?(app: App): void;
  leaveFullscreen?(app: App): void;
  openFile?(app: App): void;
  keyboardShortcuts?: AppKeyCombinations;
}

/**
 * sep: Separator
 * btn: Button
 * mnu: Menu
 */
export type WindowMenuBarItemType = "sep" | "btn" | "mnu";
