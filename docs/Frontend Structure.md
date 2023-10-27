# The ArcOS Frontend File Structure
This doc page will go over the structure and locations of all directories in ArcOS and what they contain and do. (NOT YET FINISHED)

# Index
- [Public](#public "Public Directory")
- [Source (src)](#source-src "Source Files Directory")
    - [assets](#assets "Assets Directory")
        - [apps](#apps "Apps Assets Directory")
        - [audio](#audio "Audio Assets Directory")
        - [bg](#bg "Background Assets Directory")
        - [branding](#branding "ArcOS Branding Assets Directory")
        - [First Time Setup (fts)](#first-time-setup-fts "First Time Setup Assets Directory")
        - [handlers](#handlers "App Handler Assets Directory")
        - [mimetypes](#mimetypes "File Icon Assets Directory")
        - [Profile Pictures (pfp)](#profile-pictures-pfp "Built-in Profile Pictures Assets Directory")
    - [css](#css "CSS Directory")
        - [desktop](#desktop "Desktop CSS Directory")
        - [First Time Setup (fts)](#first-time-setup-fts-1 "First Time Setup CSS Directory")
        - [login](#login "Login CSS Directory")
    - [desktop](#desktop-1 "Desktop Update Checker Directory")
    - [lib](#lib "Svelte Files Directory")
        - [Apps](#apps-1 "Apps Svelte Files Directory")

# Public
This folder is very simple to explain. This folder contains a `mode` file and a `systemIcon.svg` file.

- `systemIcon.svg` - used in [`branding.ts`](../src/ts/branding.ts) and 
- `mode` - determines the mode that ArcOS will be run in. The mode determines the branding used around the ArcOS system. Right now, it has 5 different modes:
    1. `release`
    2. `development`
    3. `admin`
    4. `unstable`
    5. `siege`

# Source (src)
This section will be separated into different sections. Look at the [Index](#index) to look for specific directories.

## assets
This folder contains all the assets used for ArcOS. This includes pictures and audio. Files you'll find in this directory are:
1. `arcfind.svg` - found in [`files.ts`](../src/ts/search/store/files.ts) and [`Result.svelte`](../src/lib/Page/Desktop/ArcFind/Result.svelte). Not sure on what its purpose is currently.
2. `devIcon` - found in [`branding.ts`](../src/ts/branding.ts). Apart of the ArcOS branding when the mode changes.
3. `spinner.svg` - found in [`Spinner.svelte`](../src/lib/Spinner.svelte). A spinner icon for when something is loading. Not yet used.
4. `systemIcon.svg` - same as the one found in public.
5. `upload.svg` - found in the System tray and on the files app code. Showed in the tray to show an update to some setting it being uploaded. Not yet seen or removed visually from the files app.

### apps
This folder and it's sub folders contains images/vector graphics for built-in apps icons.

### audio
This folder contains audio files for the different actions ArcOS system.

### bg
This and it's sub folders contains images for background on ArcOS. The subfolder labeled `oldbg` contains now unused backgrounds for ArcOS.

### branding
This folder contains images and vector graphics used for ArcOS branding inside the system.

### First Time Setup (fts)
This folder contains all the icons you notice in the First Time Setup of ArcOS.

### handlers
This folder has general icons for different handlers around ArcOS. As of now, [`apploader.svg`](../src/assets/handlers/apploader.svg) seems to be unused.

### mimetypes
This folder contains icons used in the file explorer. All icons here are of different file types that can show up on ArcOS.

### Profile Pictures (pfp)
This folder contains all default profile pictures that are in ArcOS. Null and undefined are the same (but makes sense since they mean the same thing).

## css
This folder contains all css used for ArcOS. This spans from the Desktop, to the ArcTerm, to even the First Time Setup. Everything here is pretty explanatory so no need to run over all of this.

### desktop
This contains the css for the built-in apps (`apps`), ArcFind, launcher, task bar, shell interface, window snapping (`snapzones`), the start menu, the old taskbar, built-in themes, and the windows. This also contains miscellaneous files for organizing the other css items of its type, some containing extra code, and some files just imports. Then there's files that have only some css for a similar reason.

### First Time Setup (fts)
This contains css files for first time setup.

### login


## desktop
This folder contains [`updates.ts`](../src/desktop/updates.ts) which searches for the newest update of ArcOS. If it finds one, it sends a notification to the user alerting of a new update.

## lib
The second biggest folder in src. This folder contains all the svelte files for each app and/or visual.

### Apps
This folder contains all the apps visuals interconnected with scripts to make them function as intended.
