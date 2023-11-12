/** START OF WRITABLES */
type Subscriber<T> = (value: T) => void;
type Unsubscriber = () => void;
type Updater<T> = (value: T) => T;
type StartStopNotifier<T> = (
  set: (value: T) => void,
  update: (fn: Updater<T>) => void
) => void | (() => void);
interface Readable<T> {
  subscribe(
    this: void,
    run: Subscriber<T>,
    invalidate?: Invalidator<T>
  ): Unsubscriber;
}
interface Writable<T> extends Readable<T> {
  set(this: void, value: T): void;
  update(this: void, updater: Updater<T>): void;
}
/** END OF WRITABLES */

enum LogLevel {
  info,
  warn,
  error,
  critical,
}

interface SideloadedAppLogic {
  OpenedStore: Writable<App[]>;
  WindowStore: Writable<App[]>;
  focusedWindowId: Writable<string>;
  isFullscreenWindow: Writable<boolean>;
  maxZIndex: Writable<number>;
  openWindow(id: string, openChild?: boolean): boolean;
  openChildWindow(parentId: string, childId: string): boolean;
  closeChildWindow(parent: App, childId: string): boolean;
  closeWindow(id: string): boolean;
  maximizeWindow(app: App): void;
  minimizeWindow(app: App): void;
  unminimizeWindow(app: App): void;
  fullscreenWindow(app: App): void;
  headlessToggle(app: App): void;
  fullscreenToggle(id: string): void;
  requestUserAttention(id: string): void;
  /** */
  hotSwapAppIcon(icon: string, appId: string): void;
  getOriginalIcon(appId: string): string;
  resetAppIcon(appId: string): void;
  getAppIcon(app: App): string;
  /** */
  isLoaded(id: string): boolean;
  isOpened(id: string): boolean;
  isMinimized(id: string): boolean;
  isDisabled(id: string): boolean;
  isPopulatable(app: App): boolean;
  checkFileRequirement(appId: string): void;
  /** */
  canMaximize(app: App): boolean;
  /** */
  getAppPreference(id: string, key: string): string | number | boolean | object;
  setAppPreference(
    id: string,
    key: string,
    value: string | number | boolean | object
  );
  /** */
  getWindow(id: string): App;
  getOpenedStore(): App[];
  updateStores(): void;
  /** */
  setTitleSuffix(content: string, appId: string): void;
  resetTitleSuffix(appId: string): void;
  /** */
  loadWindow(id: string, app: App): void;
}

interface SideloadedBranding {
  ARCOS_BUILD: string;
  MODE_CAPTIONS: Record<string, string>;
  ARCOS_MODE: string;
  Logo(m?: string): string;
  ArcOSVersion: string;
}

interface SideloadedUtils {
  toBase64(input: string): string;
  fromBase64(input: string): string;
  lightenColor(color: string, modifier?: number): string;
  darkenColor(color: string, modifier?: number): string;
  invertColor(hex: string): string;
  tryParse(content: string): any | false;
  tryJsonConvert<T>(content: string): T | string;
  sleep(ms: number): Promise<unknown>;
  ttlFetch(url: string, init: RequestInit, ms?: number): Promise<Response>;
}

interface SideloadedConsole {
  Log(source: string, msg: string, level?: LogLevel);
  LogStore: Writable<LogItem[]>;
  CurrentLogItem: Writable<LogItem>;
}

interface SideloadedHierarchy {
  getJsonHierarchy<T = any>(object: Object, hierarchy: string): T | null;
  setJsonHierarchy<T = any>(object: Object, hierarchy: string, value: T): T;
}

interface Window {
  ArcOS: {
    applogic: SideloadedAppLogic;
    branding: SideloadedBranding;
    utils: SideloadedUtils;
    arcConsole: SideloadedConsole;
    hierarchy: SideloadedHierarchy;
  };
}
