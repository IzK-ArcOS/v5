<script lang="ts">
  import "../../css/desktop.css";
  import { onMount } from "svelte";
  import { UserData } from "../../ts/userlogic/interfaces";
  import Wallpaper from "./Desktop/Wallpaper.svelte";
  import Shell from "./Desktop/Shell.svelte";
  import WindowStore from "./Desktop/WindowStore.svelte";
  import {
    assignDesktopListeners,
    desktopClassNames,
    loggingOff,
    showDesktop,
    startOpened,
  } from "../../ts/desktop/main";
  import {
    isFullscreenWindow,
    updateStores,
    WindowStore as WStore,
  } from "../../ts/applogic/store";
  import ErrorDialogStore from "./Desktop/ErrorDialogStore.svelte";
  import { ErrorMessages } from "../../ts/errorlogic/app";
  import PushNotification from "./Desktop/PushNotification.svelte";
  import { importDefault } from "../../ts/applogic/imports";

  let show = false;
  let classes = "";

  desktopClassNames.subscribe((v) => (classes = v));
  showDesktop.subscribe((v) => (show = v));

  onMount(() => {
    assignDesktopListeners();
    importDefault();
    resetDesktopState();

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
