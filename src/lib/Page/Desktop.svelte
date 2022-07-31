<script lang="ts">
  import "../../css/desktop.css";
  import { onMount } from "svelte";
  import { UserData } from "../../ts/userlogic/interfaces";
  import Wallpaper from "./Desktop/Wallpaper.svelte";
  import Shell from "./Desktop/Shell.svelte";
  import WindowStore from "./Desktop/WindowStore.svelte";
  import { loadWindow } from "../../ts/applogic/load";
  import { TestApp } from "../../ts/applogic/apps/testApp";
  import { AppManager } from "../../ts/applogic/apps/AppManager";
  import { UITester } from "../../ts/applogic/apps/testApp2";
  import { Exit } from "../../ts/applogic/apps/Exit";

  import {
    loggingOff,
    restarting,
    shuttingDown,
    startOpened,
  } from "../../ts/desktop/main";
  import { applyState } from "../../ts/state/main";
  import {
    isFullscreenWindow,
    OpenApps,
    updateStores,
    WindowStore as WStore,
  } from "../../ts/applogic/store";

  let show = false;
  let classes = "";
  let udata: UserData;

  UserData.subscribe((v) => {
    if (v) {
      udata = v;

      classes = "";

      if (udata.sh.taskbar.docked) classes += `tbdocked `;
      if (!udata.sh.anim) classes += `noani `;
    }
  });

  onMount(() => {
    setTimeout(() => {
      show = true;

      loadWindow("testapp", TestApp);
      loadWindow("appman", AppManager);
      loadWindow("uitester", UITester);
      loadWindow("exit", Exit);
    }, 1000);

    resetDesktopState();
  });

  loggingOff.subscribe((v) => {
    if (v) {
      show = false;

      setTimeout(() => {
        applyState("logoff");

        $loggingOff = false;
      }, 500);
    }
  });

  restarting.subscribe((v) => {
    if (v) {
      show = false;

      setTimeout(() => {
        applyState("restart");

        $restarting = false;
      }, 500);
    }
  });
  shuttingDown.subscribe((v) => {
    if (v) {
      show = false;

      setTimeout(() => {
        applyState("shutdown");

        $shuttingDown = false;
      }, 500);
    }
  });

  function resetDesktopState() {
    WStore.set([]);
    OpenApps.set([]);
    isFullscreenWindow.set(false);
    updateStores();
    startOpened.set(false);
    loggingOff.set(false);
  }

  resetDesktopState();
</script>

<div class="desktop theme-darkround fullscreen {classes}" class:show>
  {#if udata}
    <Wallpaper />
    <WindowStore />
    <Shell />
  {/if}
</div>
