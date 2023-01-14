<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop.css";
  import { importDefault } from "../../ts/applogic/imports";
  import { startKeyListener } from "../../ts/applogic/keyboard/listener";
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
  import { ErrorMessages } from "../../ts/errorlogic/app";
  import { UserData, UserName } from "../../ts/userlogic/interfaces";
  import ErrorDialogStore from "./Desktop/ErrorDialogStore.svelte";
  import PushNotification from "./Desktop/PushNotification.svelte";
  import Shell from "./Desktop/Shell.svelte";
  import Wallpaper from "./Desktop/Wallpaper.svelte";
  import WindowStore from "./Desktop/WindowStore.svelte";

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
  {#if $UserData && $UserName && !$loggingOff}
    <Wallpaper />
    <WindowStore />
    <ErrorDialogStore />
    <Shell />
    <PushNotification />
  {/if}
</div>
