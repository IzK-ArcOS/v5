<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop.css";
  import { checkForUpdates } from "../../updates/main";
  import { importDefault } from "../../ts/applogic/imports/main";
  import { startKeyListener } from "../../ts/applogic/keyboard/listener";
  import {
    isFullscreenWindow,
    updateStores,
    WindowStore as WStore,
  } from "../../ts/applogic/store";
  import {
    assignDesktopListeners,
    desktopClassNames,
    previouslyLoaded,
    showDesktop,
    startOpened,
  } from "../../ts/desktop/main";
  import { restart } from "../../ts/desktop/power";
  import { ErrorMessages } from "../../ts/errorlogic/app";
  import { startMessageCheckInterval } from "../../ts/messaging/interval";
  import { UserData, UserName } from "../../ts/userlogic/interfaces";
  import ArcFind from "./Desktop/ArcFind.svelte";
  import ContextMenu from "./Desktop/ContextMenu.svelte";
  import ErrorDialogStore from "./Desktop/ErrorDialogStore.svelte";
  import WindowStore from "./Desktop/WindowStore.svelte";
  import { ArcSoundBus } from "../../ts/sound/main";
  import { sendReport } from "../../ts/reporting/main";

  let show = false;
  let classes = "";

  desktopClassNames.subscribe((v) => (classes = v));
  showDesktop.subscribe((v) => (show = v));

  onMount(async () => {
    ArcSoundBus.playSound("arcos.system.logon");

    if ($previouslyLoaded) {
      restart(false);

      return;
    }

    $previouslyLoaded = true;

    assignDesktopListeners();
    importDefault();
    resetDesktopState();
    startKeyListener();

    setTimeout(() => (show = true), 250);

    startMessageCheckInterval();
    checkForUpdates();
  });

  function resetDesktopState() {
    WStore.set([]);
    isFullscreenWindow.set(false);
    updateStores();
    startOpened.set(false);
    ErrorMessages.set([]);
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
