# ArcOS Svelte Rewrite

The time has come to completely rethink the initial idea for the ArcOS project. As a reminder, I originally specified that ArcOS was going to be a desktop application by using the electron framework. It has come to my attention that the demand for a typescript codebase is bigger than ever and growing drastically because of the rich featureset that I wish to accomplish with ArcOS. That's why I'm dropping Electron in favour of Typescript. That means, in the early days of this codebase, that ArcOS will run 100% in the browser, no exceptions. In the future, once we have the optional backend API written, we can work on a bundled version that implements both the backend and frontend into one singular application on the user's PC. Until then we're sticking to browser-only.

## Credits

Before I go all technical and explain the inner workings of ArcOS, I must give credit where credit's due.

- Big thanks to the **Papirus Development Team** for creating their icon pack, you can find the pack I used [here](https://github.com/PapirusDevelopmentTeam/papirus-icon-theme).
- All ArcOS wallpapers were created or licensed to me.

## License

All code in this project was created by me or by other members of the ArcOS Team. All files in this repository are thereby licensed under [GPLv3](./LICENSE).

## The concept

All frontend components required to get the ArcOS experience I seek, bundled into one webapp. Each main component (such as the boot screen, login, etc etc), will all be contained as `State` objects, which contain things like the name of the component as well as the svelte component. As of July 6th 2022, this is the interface for storing `State`s:

```ts
export interface State {
  name: string;
  content: SvelteComponent | any;
  attribs: { [key: string]: boolean | string | number };
}
```

| key       | type                                            | details                                             |
| --------- | ----------------------------------------------- | --------------------------------------------------- |
| `name`    | `string`                                        | Contains the display name (like `First Time Setup`) |
| `content` | `SvelteComponentDev \| any`                     | The actual body of the state                        |
| `attribs` | `{ [key:string]: boolean \| string \| number }` | Additional attributes different state types can use |

## The user system

As of right now, we only have LocalStorage to store userdata for ArcOS we **do not** yet have the backend API which will handle userdata storage, permissions and filesystem access. What we do have though, is a decoupled method of writing the data to LocalStorage. We need to change just one function in `src/ts/userlogic/main.ts` to change where the data is uploaded to:

```ts
export function setUserdata(name: string, data: UserData): boolean;
```

Speaking of, this is the `UserData` interface which contains all personal and administrative preferences for a user:

```ts
export interface UserData {
  sh: {
    taskbar: {
      centered: boolean;
      labels: boolean;
      pos: "top" | "bottom";
      docked: boolean; //done
    };

    window: {
      bigtb: boolean;
    };

    desktop: {
      wallpaper: string | null;
      icons: boolean;
    };

    start: {
      small: boolean; //done
    };

    anim: boolean; //done
    titleButtonsLeft: boolean;
    noGlass: boolean;
  };

  acc: {
    enabled: boolean;
    admin: boolean;
    profilePicture: string | number | null;
  };
  volume: {
    level: number;
    muted: boolean;
  };
}
```

Overview of what preferences have implementations in ArcOS:
| property | Friendly Name | status |
|---------------------------------|-----------------------------------|-------------------------------------------------------------------------|
| `UserData.sh.taskbar.centered` | Center taskbar buttons | not implemented |
| `UserData.sh.taskbar.labels` | Show taskbar button labels | implemented: `src/lib/Page/Desktop/Taskbar/TaskbarButton.svelte` in `{#if showLabel}` |
| `UserData.sh.taskbar.pos` | Taskbar position | not implemented |
| `UserData.sh.taskbar.docked` | Dock the taskbar | implemented: `src/lib/Page/Desktop/Taskbar.svelte` in `div.taskbar` |
| `UserData.sh.desktop.wallpaper` | Wallpaper | implemented: `src/lib/Page/Desktop/Wallpaper.svelte` in `div.wallpaper` |
| `UserData.sh.desktop.icons` | Show the desktop icons | not implemented |
| `UserData.sh.start.small` | Small start menu | implemented: `src/lib/Page/Desktop/StartMenu.svelte` in `div.startmenu` |
| `UserData.sh.anim` | Enable animations | implemented: `src/lib/Page/Desktop.svelte` in `UserData.subscribe` |
| `UserData.sh.titleButtonsLeft` | Titlebar buttons on the left side | implemented: `src/lib/Page/Desktop/Window.svelte` in `<window class:lefttb>` |
| `UserData.acc.enabled` | Is the user enabled? | (partially) implemented: `src/lib/Page/Login/User.svelte` in `{#if}` |
| `UserData.acc.admin` | Is the user an administrator? | not implemented |
| `UserData.acc.profilePicture` | The user profile picture | not implemented |
| `UserData.volume.level` | The ArcOS desktop volume | (halted) |
| `UserData.volume.muted` | Mute ArcOS | (halted) |

## Plans for the future

In the future I want to implement a backend API to allow for me to restore some of the key initial features of ArcOS. One of these include the file explorer, because that was vanilla-JS, electron only FS interaction functionality, which we can't get with TS in a browser without some kind of backend.

> NOTE: API concepting has begun in [ENDPOINTS.md](./ENDPOINTS.md)
