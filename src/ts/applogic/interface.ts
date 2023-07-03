import type { ArcFile } from "../api/interface";
import type { ErrorButton } from "../errorlogic/app";
import type { AppKeyCombinations } from "./keyboard/interface";
import type { ProcessRuntime as ProcessRuntime } from "./runtime/main";
export interface App {
  info: GeneralAppInfo;
  id?: string;
  pid?: number;
  initialSize: Size;
  minSize: Size;
  maxSize: Size;
  menubar?: WindowMenuBar;
  controls: ControlsConfiguration;
  content: any;
  glass: boolean;
  disabled?: boolean;
  events?: ProcessEvents;
  fileMimes?: string[];
  contextMenu?: AppContextMenu;
  disabledWarning?: { title: string; message: string };
  core?: boolean;
  windowProperties: WindowProperties;
  initialWindowState: WindowState;
  overlayApps?: { [key: string]: OverlayableApp };
}

export interface Process {
  app: App;
  id: number;
  children?: { [key: number]: Process };
  parentPid?: number;
  pos: Position & { centered?: boolean };
  size: Size;
  windowState: WindowState;
  openedFile?: ArcFile;
  overlayProcesses?: { [key: string]: OverlayableProcess };
  errorProcessOverlays?: { [key: number]: OverlayableError };
  snapped?: boolean;
  runtime?: typeof ProcessRuntime;
}

export interface OverlayableError {
  title: string;
  message: string;
  buttons: ErrorButton[];
  image?: string;
  id?: number;
}

export interface OverlayableApp {
  info: OverlayableAppInfo;
  size: Size;
  content?: any;
  id?: string;
}

export interface OverlayableProcess {
  overlayableApp: OverlayableApp;
  id: string;
  parentPid?: number;
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
}

export interface OverlayableAppInfo {
  name: string;
  author: string;
  version: string;
}

export interface WindowProperties {
  headless: boolean;
  resizable: boolean;
}

export type Size = { w: number; h: number };
export type Position = { x: number; y: number };

export interface WindowState {
  minimized: boolean;
  maximized: boolean;
  fullscreen: boolean;
}

export interface ControlsConfiguration {
  minimized: boolean;
  maximized: boolean;
  close: boolean;
}

export interface ContextMenuItem {
  sep?: boolean;
  caption?: string;
  icon?: string;
  image?: string;
  isActive?: () => boolean | Promise<boolean>;
  action?(window: App, data: DOMStringMap, scope: string): void;
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

export interface ProcessEvents {
  open?(pid: number): void;
  close?(pid: number): void;
  maximize?(pid: number): void;
  minimize?(pid: number): void;
  enterFullscreen?(pid: number): void;
  leaveFullscreen?(pid: number): void;
  openFile?(pid: number): void;
  blur?(pid: number): void;
  focus?(pid: number): void;
  keyboardShortcuts?: AppKeyCombinations;
}

/**
 * sep: Separator
 * btn: Button
 * mnu: Menu
 */
export type WindowMenuBarItemType = "Separator" | "Button" | "Menu";
