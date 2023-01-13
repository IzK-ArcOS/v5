<script lang="ts">
  import poker from "../../assets/apps/apppoker.svg";
  import { onMount } from "svelte";
  import "../../css/desktop.css";
  import { importDefault } from "../../ts/applogic/imports";
  import {
    isFullscreenWindow,
    updateStores,
    WindowStore as WStore,
  } from "../../ts/applogic/store";
  import {
    assignDesktopListeners,
    desktopClassNames,
    loggingOff,
    showDesktop,
    startOpened,
  } from "../../ts/desktop/main";
  import { createTrayIcon, disposeTrayIcon } from "../../ts/desktop/tray/main";
  import { ErrorMessages } from "../../ts/errorlogic/app";
  import { UserData } from "../../ts/userlogic/interfaces";
  import ErrorDialogStore from "./Desktop/ErrorDialogStore.svelte";
  import PushNotification from "./Desktop/PushNotification.svelte";
  import Shell from "./Desktop/Shell.svelte";
  import Wallpaper from "./Desktop/Wallpaper.svelte";
  import WindowStore from "./Desktop/WindowStore.svelte";
  import { errorMessage } from "../../ts/errorlogic/main";
  import { startKeyListener } from "../../ts/applogic/keyboard/listener";

  let show = false;
  let classes = "";

  desktopClassNames.subscribe((v) => (classes = v));
  showDesktop.subscribe((v) => (show = v));

  onMount(() => {
    assignDesktopListeners();
    importDefault();
    resetDesktopState();
    startKeyListener();

    setTimeout(() => (show = true), 250);
  });

  function resetDesktopState() {
    WStore.set([]);
    isFullscreenWindow.set(false);
    updateStores();
    startOpened.set(false);
    loggingOff.set(false);
    ErrorMessages.set([]);
  }
</script>

<div class="desktop theme-darkround fullscreen {classes}" class:show>
  {#if $UserData}
    <Wallpaper />
    <WindowStore />
    <ErrorDialogStore />
    <Shell />
    <PushNotification />
  {/if}
</div>
