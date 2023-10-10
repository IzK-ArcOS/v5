<script lang="ts">
  import "../../css/desktop/apps/exit.css";
  import { defaultDirectory } from "../../ts/api/interface";
  import {
    FileBrowserCurrentDir,
    FileBrowserDeletingFilename,
    FileBrowserDirContents,
    FileBrowserSelectedFilename,
  } from "../../ts/applogic/apps/FileBrowser/main";
  import { closeWindow } from "../../ts/applogic/events";
  import type { App } from "../../ts/applogic/interface";
  import { WindowStore, isFullscreenWindow } from "../../ts/applogic/store";
  import { restart, shutdown } from "../../ts/desktop/power";
  import { ErrorMessages, ErrorWindowStore } from "../../ts/errorlogic/app";
  import { selectedMessageId } from "../../ts/messaging/main";
  import { NotificationStore } from "../../ts/notiflogic/main";
  import { applyState } from "../../ts/state/main";

  export let app: App;

  function cancel() {
    isFullscreenWindow.set(false);

    closeWindow(app.id);
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
    <button class="cancel" on:click={cancel}>Cancel</button>
  </div>
</div>
