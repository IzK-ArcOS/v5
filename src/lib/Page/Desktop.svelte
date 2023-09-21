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
  import SnapZones from "./Desktop/Wallpaper/SnapZones.svelte";
  import { checkFirefox } from "../../ts/desktop/browser";

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

    await getUsers();
    await getExperiments();
    await sleep(0);

    assignDesktopListeners();
    importDefault();
    resetDesktopState();
    startKeyListener();
    startMessageCheckInterval();
    checkDesktopFile();
    checkFirefox();

    await checkForUpdates();
    await checkReleaseCandidate();

    setTimeout(() => (show = true), 250);
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
    class="
    desktop fullscreen {classes}
    theme-{$UserData.sh.desktop.theme}
    tb-{$UserData.sh.taskbar.pos}
    cursor-{$UserData.sh.desktop.noCustomCursor ? '' : 'custom'}"
    class:noglass={navigator.userAgent.toLowerCase().includes("firefox")}
    class:show
    style="--accent: #{$UserData.sh.desktop.accent || '70D6FF'} !important"
  >
    <WindowStore />
    <ErrorDialogStore />
    <ContextMenu />
    <ArcFind />
  </div>
{/if}
