<script lang="ts">
  import "../../css/desktop/apps/exit.css";
  import { defaultDirectory } from "../../ts/api/interface";
  import { ExitShowAT } from "../../ts/applogic/apps/Exit";
  import {
    FileBrowserCurrentDir,
    FileBrowserDeletingFilename,
    FileBrowserDirContents,
    FileBrowserSelectedFilename,
  } from "../../ts/applogic/apps/FileBrowser/main";
  import { closeWindow } from "../../ts/applogic/events";
  import type { App } from "../../ts/applogic/interface";
  import { isFullscreenWindow, WindowStore } from "../../ts/applogic/store";
  import { loggingOff } from "../../ts/desktop/main";
  import { logoff, restart, shutdown } from "../../ts/desktop/power";
  import { ErrorMessages, ErrorWindowStore } from "../../ts/errorlogic/app";
  import { selectedMessageId } from "../../ts/messaging/main";
  import { NotificationStore } from "../../ts/notiflogic/main";
  import { applyState } from "../../ts/state/main";

  export let app: App;

  function cancel() {
    isFullscreenWindow.set(false);

    closeWindow(app.id);
  }

  function arcterm() {
    FileBrowserCurrentDir.set("./");
    FileBrowserSelectedFilename.set(null);
    FileBrowserDirContents.set(defaultDirectory);
    FileBrowserDeletingFilename.set(null);
    NotificationStore.set({});
    ErrorWindowStore.set([]);
    ErrorMessages.set([]);
    WindowStore.set([]);
    selectedMessageId.set(null);

    applyState("arcterm");
  }
</script>

<div class="center-flex">
  <div class="flex-stop">
    <h3 class="header">ArcOS</h3>
    <button class="option" on:click={shutdown}>
      <span class="material-icons-round">power_settings_new</span>
      <p class="caption">Shutdown</p>
    </button>
    <button class="option" on:click={() => restart(true)}>
      <span class="material-icons-round">logout</span>
      <p class="caption">Logoff</p>
    </button>
    <button class="option" on:click={() => restart(false)}>
      <span class="material-icons-round">refresh</span>
      <p class="caption">Restart</p>
    </button>
    {#if $ExitShowAT}
      <button class="option" on:click={arcterm}>
        <span class="material-icons-round">terminal</span>
        <p class="caption">ArcTerm</p>
      </button>
    {/if}
    <button class="cancel" on:click={cancel}>Cancel</button>
  </div>
</div>
