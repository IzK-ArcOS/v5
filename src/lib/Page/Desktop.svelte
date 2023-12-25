<script lang="ts">
  import { onMount } from "svelte";
  import "../../css/desktop.css";
  import { importDefault } from "../../ts/applogic/imports/main";
  import { startKeyListener } from "../../ts/applogic/keyboard/listener";
  import {
    isFullscreenWindow,
    updateStores,
    WindowStore as WStore,
  } from "../../ts/applogic/store";
  import { checkReleaseCandidate } from "../../ts/branding/rc";
  import { checkDesktopFile } from "../../ts/desktop/app";
  import { getExperiments } from "../../ts/desktop/experiments/main";
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
  import sleep from "../../ts/sleep";
  import { ArcSoundBus } from "../../ts/sound/main";
  import { UserData, UserName } from "../../ts/userlogic/interfaces";
  import { getUsers } from "../../ts/userlogic/main";
  import { checkForUpdates } from "../../updates/main";
  import ArcFind from "./Desktop/ArcFind.svelte";
  import ContextMenu from "./Desktop/ContextMenu.svelte";
  import ErrorDialogStore from "./Desktop/ErrorDialogStore.svelte";
  import WindowStore from "./Desktop/WindowStore.svelte";
  import { darkenColor, invertColor, lightenColor } from "../../ts/color";
  import { Sideload } from "../../ts/applogic/sideloading/main";
  import { DefaultIcon } from "../../ts/icon/apps";

  let classes = "";
  let accent = "";
  let style = "";

  desktopClassNames.subscribe((v) => (classes = v));

  onMount(async () => {
    ArcSoundBus.playSound("arcos.system.logon");

    if ($previouslyLoaded) {
      restart(false);

      return;
    }

    $previouslyLoaded = true;

    await getUsers();
    await getExperiments();
    await sleep(0);

    assignDesktopListeners();
    importDefault();
    resetDesktopState();
    startKeyListener();
    startMessageCheckInterval();
    checkDesktopFile();

    await checkForUpdates();
    await checkReleaseCandidate();
    await sleep(100);

    showDesktop.set(true);
  });

  UserData.subscribe((v) => {
    if (!v) return;

    accent = $UserData.sh.desktop.accent || "70D6FF";

    style = `
    --accent: #${accent} !important;
    --accent-light: ${lightenColor(accent)} !important;
    --accent-lighter: ${lightenColor(accent, 0.65)} !important;
    --accent-dark: ${darkenColor(accent, 75)} !important;
    --accent-darkest: ${darkenColor(accent, 90)} !important;
    --accent-light-transparent: ${lightenColor(accent)}77 !important;
    --accent-light-invert: ${invertColor(lightenColor(accent))} !important;`;
  });

  function resetDesktopState() {
    WStore.set([]);
    isFullscreenWindow.set(false);
    updateStores();
    startOpened.set(false);
    ErrorMessages.set([]);
  }
</script>

{#if $UserData && $UserName && accent}
  <div
    class="
    desktop fullscreen {classes}
    theme-{$UserData.sh.desktop.theme}
    tb-{$UserData.sh.taskbar.pos}
    cursor-{$UserData.sh.desktop.noCustomCursor ? '' : 'custom'}"
    class:show={$showDesktop}
    {style}
  >
    <WindowStore />
    <ErrorDialogStore />
    <ContextMenu />
    <ArcFind />
  </div>
{/if}
