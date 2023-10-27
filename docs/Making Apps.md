## Table of Contents

- [Intro](#intro "Introduction to the user")
- [Setup](#setup "Setting up the app for use")
  - [App Configuration](#app-configuration "Configuring app for the list")
  - [Adding to the list](#adding-to-the-list "Adding the app to the list")
  - [Creating the Svelte Content](#creating-the-svelte-content "Creating the UI for the app")
  - [Adding the UI](#adding-the-ui "Adding the app's UI to the app")
- [What next?](#what-next "What to do next with making an app")
  - [Organizing Files](#organizing-your-files "Organizing the files correctly")
  - [Keeping clean, small code](#keeping-clean-and-small-code "Making the code clean and neat")

## Intro

Ever wondered how you could make an app for ArcOS?
Well you're in luck!
This will guide you on how you can make a simple app.

## Setup

### App Configuration
You're going to want to add a new file to `src/ts/applogic/apps`
which will hold the app data for your new app.
The file should look something like this:

```ts
import logo from "../../../assets/apps/default.svg";
import type { App } from "../interface";

export const MyFirstApp: App = {
  info: {
    name: "My First Application",
    description: "This is my first app on ArcOS!",
    builtin: true,
    version: "1.0.0",
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
  content: null,
  glass: true,
};
```

> You'll want to replace the placeholders with your info.

### Adding to the list

Once you have the app typescript file, you'll want to put the `AppID` inside the `src/ts/applogic/imports/store.ts` file like so:

```ts
...

import { MarkDownViewer } from "../apps/MarkDownViewer";
import { MediaPlayerApp } from "../apps/MediaPlayer";
import { MessagingApp } from "../apps/MessagingApp";
import { MyFirstApp } from "../apps/MyFirstApp"; // The app file you created

...
export const DefaultApps: { [key: string]: App } = {
  DonutApp,
  LightsOff,
  ArcShell,
  MyFirstApp, // The name of the import you added

...
```

And that's it to have an app show in ArcOS! But you want to have a functioning app right? Well how about we make it so you can have a functioning app.

### Creating the Svelte content

You'll want to create a new `.svelte` file for your app in `src/Apps`. In there you can add whatever UI you want, but I'm going with a simple "Hello world!" text.

```html
<div class="center-flex">
    <h1>Hello World!</h1>
</div>
```

### Adding the UI

Once you've created the UI for your app, or copied the example, you'll want to add the import statement for the main contents of the app.

```ts
import logo from "../../../assets/apps/default.svg";
import MyFirstAppContent from "../../../lib/Apps/MyFirstApp.svelte";
import type { App } from "../interface";

...

  windowState: { min: false, max: false, fll: false },
  },
  content: MyFirstAppContent,
  glass: true,

...
```

And there it is! A basic ArcOS app that says "Hello World!".

## What next?

### Organizing your files
To start off, you'll want to get the app sectioned off into multiple folders more
than likely so that you can stay organized and know where everything is located for later.
In that same folder as your app contents, (\``src/Apps`\`), you'll want to
add a folder of the same name as your svelte file. Then from there, you can
create as many sub-folders and files you need but be sure they are
Svelte files only. It's generally not a good idea to put TypeScript files
together like that with Svelte files. In that case, you'll want to add a
folder for TypeScript files in `src/ts/applogic/apps` with the same name as
your Svelte file.

### Keeping clean and small code
With folders separating your Svelte files and TypeScript files,
you'll want to have them interact in some way and that requires imports.

> **Tip:** Avoid putting all your ts and svelte files all in one file

Doing so can cause your code to become messy if it grows in size.
Leave your main app content svelte file where everything all comes together.
Doing so will allow for you to keep code separated, clean, and readable.

###### Many thanks to reading this! | Blocky (Cy) of the DWC team