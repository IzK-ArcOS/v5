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
    OpenApps,
    updateStores,
    WindowStore as WStore,
  } from "../../ts/applogic/store";
  import ErrorDialogStore from "./Desktop/ErrorDialogStore.svelte";
  import { ErrorMessages } from "../../ts/errorlogic/app";
  import PushNotification from "./Desktop/PushNotification.svelte";
  import { importDefault } from "../../ts/applogic/imports";
  import { errorMessage } from "../../ts/errorlogic/main";

  let show = false;
  let classes = "";

  desktopClassNames.subscribe((v) => (classes = v));
  showDesktop.subscribe((v) => (show = v));

  onMount(() => {
    assignDesktopListeners();
    importDefault();
    resetDesktopState();

    setTimeout(() => (show = true), 1000);

    errorMessage(
      "Warning",
      "Thank you for checking out ArcOS! Do note that the WindowStore is unstable at this point in development, some windows may like to inherit positional and sizing properties of others, try to ignore that for now.",
      { caption: "OK", action: () => {} }
    );
  });

  function resetDesktopState() {
    WStore.set([]);
    OpenApps.set([]);
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
