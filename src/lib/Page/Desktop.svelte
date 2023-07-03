<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop.css";
  import { checkForUpdates } from "../../tauri/updates";
  import { importAutoLoaders } from "../../ts/applogic/aftermarket/autoload";
  import { importDefault } from "../../ts/applogic/imports/main";
  import { startKeyListener } from "../../ts/applogic/keyboard/listener";
  import { isFullscreenWindow, updateStores } from "../../ts/applogic/store";
  import {
    assignDesktopListeners,
    desktopClassNames,
    previouslyLoaded,
    showDesktop,
    startOpened,
  } from "../../ts/desktop/main";
  import { restart } from "../../ts/desktop/power";
  import { DevModeOverride } from "../../ts/devmode/props";
  import { ErrorMessages } from "../../ts/errorlogic/app";
  import { startMessageCheckInterval } from "../../ts/messaging/interval";
  import { checkLinux } from "../../ts/tauri/linux";
  import { UserData, UserName } from "../../ts/userlogic/interfaces";
  import ArcFind from "./Desktop/ArcFind.svelte";
  import ContextMenu from "./Desktop/ContextMenu.svelte";
  /* 
  import ErrorDialogStore from "./Desktop/ErrorDialogStore.svelte"; */
  import WindowStore from "./Desktop/WindowStore.svelte";
  import { createProcess } from "../../ts/applogic/events";
  import ErrorDialogStore from "./Desktop/ErrorDialogStore.svelte";

  let show = false;
  let classes = "";

  desktopClassNames.subscribe((v) => (classes = v));
  showDesktop.subscribe((v) => (show = v));

  onMount(async () => {
    if ($previouslyLoaded) {
      restart(false);

      return;
    }

    $previouslyLoaded = true;

    assignDesktopListeners();
    await importDefault();
    resetDesktopState();
    startKeyListener();

    importAutoLoaders();

    setTimeout(() => (show = true), 250);

    startMessageCheckInterval();
    checkForUpdates();
    checkLinux();

    createProcess("ArcShell");
    createProcess("DesktopWallpaper");
  });

  function resetDesktopState() {
    /* WStore.set([]); */
    isFullscreenWindow.set(false);
    updateStores();
    startOpened.set(false);
    ErrorMessages.set([]);
    DevModeOverride.set($UserData.devmode);
  }
</script>

{#if $UserData && $UserName}
  <div
    class="desktop theme-{$UserData.sh.desktop.theme} tb-{$UserData.sh.taskbar
      .pos} fullscreen {classes}"
    class:show
    style="--accent: #{$UserData.sh.desktop.accent || '70D6FF'} !important"
  >
    <WindowStore />

    <ErrorDialogStore />
    <ContextMenu />
    <ArcFind />
  </div>
{/if}
