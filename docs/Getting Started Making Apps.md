YET TO BE FINISHED

```ts
import logo from "../../../assets/apps/default.svg";
import type { App } from "../interface";

export const AppId: App = {
  // Change "AppId" to the application ID
  info: {
    name: "Application Name",
    description: "This is a description",
    builtin: true,
    version: "X.X.X",
    author: "Author Name",
    icon: logo,
    hidden: false,
  },
  size: { w: 300, h: 400 },
  pos: { x: 60, y: 60 },
  minSize: { w: 300, h: 400 },
  maxSize: { w: 800, h: 600 },
  controls: { min: true, max: true, cls: true },
  state: {
    headless: false,
    resizable: false,
    windowState: { min: false, max: false, fll: false },
  },
  content: null /** Svelte file goes here */,
  glass: true,
};
```

> Put this file inside the `src/ts/applogic/apps`.
>
> Put the `AppID` inside the `src/ts/applogic/imports/store.ts`.
