# ArcOS Application Imports

One interesting aspect of ArcOS development has always been the way I import applications into the runtime. Back in the electron days I could simply inject the JS, CSS and HTML files of any given app into the runtime and ArcOS would pick it up nicely. This meant that all applications had immediate access to all of ArcOS to make for a good user experience.

## The problem

This frontend code injection is no longer possible because we aren't on vanilla JS and Electron anymore. We now have to find a way to import apps: both in the development mode - so before building and deployment - and in production mode where the user can import applications in a deployed copy of ArcOS.

## The solution _for Dev Mode Apps (DMAs)_

Implementing DMAs is easy. We just need a couple of concrete rules and interfaces to get it all to work the way we want it to with maximum flexibility. I have the following `interface App` in mind that will make for a modular system that also allows for mutation of various application states after the app has been loaded into the WindowStore.

```ts
interface App {
  content: any;
  state: AppStates;
  minSize: Size;
  maxSize: Size;
  pos: XY;
  controls: ControlsState;
  menubar?: WindowMenuBar;
  info: GeneralAppInfo;
}
```

The `content` attribute contains the actual Svelte component that will be displayed using a `svelte:component` element. The `AppStates`, `Size`, `XY`, `ControlsState`, `WindowMenuBar` and `GeneralAppInfo` names are interfaces and types used to make them more accessible to the rest of the code. Here they are:

### General App Info (`interface GeneralAppInfo`)

```ts
interface GeneralAppInfo {
  name: string;
  description: string;
  builtin: boolean;
  version: string;
  author?: string;
}
```

### Application States (`interface AppStates`)

```ts
interface AppStates {
  headless: boolean; // Window headless?
  resizable: boolean; // Window resizable?
  windowState: WindowState; // General window states
}
```

### Size Definition (`type Size`)

```ts
type Size = { w: number; h: number };
```

### Positional Definition (`type XY`)

```ts
type XY = { x: number; y: number };
```

### Window State (`interface WindowState`)

```ts
interface WindowState {
  min: boolean; // Minimized
  max: boolean; // Maximized
  fll: boolean; // Fullscreen
}
```

### Control State (`interface ControlState`)

```ts
interface ControlsState {
  min: boolean; // Minimized
  max: boolean; // Maximized
  cls: boolean; // Close
}
```

### Menu Bar (`interfae WindowMenuBar`, `interface WindowMenuBarItem`, `type WindowMenuBarItemType`)

```ts
interface WindowMenuBar {
  leftItems: WindowMenuBarItem[];
  rightItems: WindowMenuBarItem[];
  visibleOnHeadless: boolean;
  visibleOnFullscreen: boolean;
}

interface WindowMenuBarItem {
  type: WindowMenuBarItemType;
  caption?: string;
  click?: (e: MouseEvent) => void;
  menuItems?: WindowMenuBarItem[];
}

type WindowMenuBarItemType = "sep" | "button" | "menu";
```
